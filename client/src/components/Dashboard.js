import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiHome, FiUsers, FiSettings, FiX } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-cyan-600 text-white w-52 p-4 space-y-6 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-all ease-in-out duration-300 md:relative md:translate-x-0 md:w-52 lg:w-64 shadow-lg z-50 h-full overflow-y-auto`}>
        {/* Sidebar Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold">ByteAsk</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white md:hidden absolute top-4 right-4">
            <FiX size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 space-y-3">
          <button className="flex items-center space-x-2 text-white text-base hover:bg-cyan-700 p-2 rounded-md w-full transition-all">
            <FiHome size={20} /> <span>Home</span>
          </button>
          <button className="flex items-center space-x-2 text-white text-base hover:bg-cyan-700 p-2 rounded-md w-full transition-all">
            <FiUsers size={20} /> <span>Community</span>
          </button>
          <button className="flex items-center space-x-2 text-white text-base hover:bg-cyan-700 p-2 rounded-md w-full transition-all">
            <FiSettings size={20} /> <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-3 flex justify-between items-center sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <FiMenu size={24} />
          </button>
          <h2 className="text-lg font-bold text-gray-700">Dashboard</h2>
          <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all">
            <FiLogOut size={20} /> <span>Logout</span>
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-4">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Welcome to ByteAsk</h2>
          <p className="text-gray-600 mb-4 text-base">Engage in discussions, ask questions, and explore the knowledge hub.</p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-cyan-700">📌 Latest Questions</h3>
              <p className="text-gray-600 mt-1">View and engage with the latest questions posted by the community.</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-cyan-700">📊 Your Contributions</h3>
              <p className="text-gray-600 mt-1">Track your answers, upvotes, and reputation in the community.</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-cyan-700">📢 Trending Discussions</h3>
              <p className="text-gray-600 mt-1">Stay updated with the hottest topics in the tech world.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;