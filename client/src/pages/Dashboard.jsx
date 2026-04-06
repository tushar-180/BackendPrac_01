import React, { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { FiMonitor, FiSmartphone, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const {user,setUser} = useAuth()

  const fetchDevices = async () => {
    const res = await api.get("/auth/my-devices");
    setDevices(res.data.devices);
  };

  const logoutDevice = async (session) => {
    await api.post("/auth/logout-device", { sessionId:session._id });
    fetchDevices();
    if(session.isCurrentDevice){
      setUser(null)
      navigate("/login");
    }
  };

  const logoutAll = async () => {
    await api.get("/auth/logout-all");
    setUser(null)
    setDevices([]);
    navigate("/login");
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Logged in Devices ({devices.length})
          </h2>

          <button
            onClick={logoutAll}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiLogOut />
            Logout All
          </button>
        </div>

        {/* Device Cards */}
        <div className={`space-y-4 `}>
          {devices.map((d) => (
            <div
              key={d._id}
              className={`bg-white rounded-2xl shadow-md p-4 flex justify-between items-center hover:shadow-lg transition ${d.isCurrentDevice ? "border-2 border-blue-500" : ""}`}
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-3 rounded-full">
                  {getIcon(d.device)}
                </div>

                <div>
                  <p className="font-medium text-lg">{d.device}</p>
                  <p className="text-sm text-gray-500">IP: {d.ip}</p>
                  <p className="text-xs text-gray-400">
                    Last active: {new Date(d.lastActive).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right */}
              <button
                onClick={() => logoutDevice(d)}
                className="text-sm bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {devices.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No active devices
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
