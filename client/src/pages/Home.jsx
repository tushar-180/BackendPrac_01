import React from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser, FiGrid } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* 🔝 Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-blue-600 cursor-pointer"
        >
          MyApp
        </h1>

        {/* Right */}
        <div className="flex items-center gap-6">
          
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <FiGrid />
            Dashboard
          </button>

          <div className="flex items-center gap-2 text-gray-700">
            <FiUser />
            <span className="font-medium">{user?.username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </nav>

      {/* 🏠 Main Content */}
      <div className="flex items-center justify-center mt-16 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg text-center space-y-6">
          
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome {user?.username || "User"} 👋
          </h1>

          <p className="text-gray-500">
            You are successfully logged in. Manage your account and devices easily.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Go to Device Dashboard
            </button>

            <button
              onClick={() => navigate("/about")}
              className="border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
            >
              About Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;