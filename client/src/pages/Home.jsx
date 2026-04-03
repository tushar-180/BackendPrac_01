import React from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      console.log("error", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome {user?.username || "User"} 👋
        </h1>

        <p className="text-gray-500">You are successfully logged in</p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/about")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Go to About
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
          >
            Login Page
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
          >
            Register Page
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
