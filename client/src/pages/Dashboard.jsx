import React, { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { FiMonitor, FiSmartphone, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const fetchDevices = async () => {
    try {
      const res = await api.get("/auth/my-devices");
      setDevices(res.data.devices);
    } catch (err) {
      toast.error("Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  const logoutDevice = async (session) => {
    await api.post("/auth/logout-device", { sessionId: session._id });
    fetchDevices();
    if (session.isCurrentDevice) {
      setUser(null);
      navigate("/login");
    }
  };

  const logoutAll = async () => {
    await api.get("/auth/logout-all");
    setUser(null);
    setDevices([]);
    navigate("/login");
  };

  const logoutAllExceptCurrent = async () => {
    try {
      await api.get("/auth/logout-all-except-current");
      fetchDevices();
      toast.success("Other devices logged out");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const getIcon = (device) => {
    if (device.toLowerCase().includes("mobile")) {
      return <FiSmartphone className="text-xl" />;
    }
    return <FiMonitor className="text-xl" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Device Sessions {devices.length}
            </h2>
            <p className="text-gray-500 text-sm">
              Manage and monitor your active logins
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={logoutAllExceptCurrent}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm shadow"
            >
              Logout Others
            </button>

            <button
              onClick={logoutAll}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow"
            >
              Logout All
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 mt-10">
            Loading devices...
          </div>
        )}

        {/* Devices */}
        <div className="space-y-4">
          {devices.map((d) => (
            <div
              key={d._id}
              className={`bg-white rounded-xl border p-4 flex justify-between items-center transition hover:shadow-md ${
                d.isCurrentDevice ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  {getIcon(d.device)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{d.device}</p>

                    {d.isCurrentDevice && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">IP: {d.ip}</p>
                  <p className="text-xs text-gray-400">
                    Last active: {new Date(d.lastActive).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right */}
              {!d.isCurrentDevice && (
                <button
                  onClick={() => logoutDevice(d)}
                  className="text-sm bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Empty */}
        {!loading && devices.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">No active devices found</p>
            <p className="text-gray-400 text-sm mt-2">
              You're currently logged out everywhere
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
