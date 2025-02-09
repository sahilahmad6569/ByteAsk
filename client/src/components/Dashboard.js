import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiHome, FiUsers, FiSettings, FiX, FiPlus } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle question form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    fetchLatestQuestions();
  }, [navigate]);

  const fetchLatestQuestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/questions/latest");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // ✅ Handle Logout (Fixed Issue)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // ✅ Handle Create Question Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, tags: tags.split(",") }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions([data, ...questions]); // Add new question instantly
        setShowForm(false); // Hide form after submission
        setTitle("");
        setDescription("");
        setTags("");
      } else {
        alert("Failed to create question.");
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar (Fixed) */}
      <div className={`fixed inset-y-0 left-0 bg-cyan-600 text-white w-48 md:w-44 lg:w-48 p-4 flex flex-col justify-between transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0 shadow-lg z-50 h-screen`}>
        
        {/* Sidebar Top Section */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold">ByteAsk</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-white md:hidden absolute top-4 right-4">
              <FiX size={24} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-6 space-y-3">
            <button onClick={() => setActiveSection("home")} className={`flex items-center space-x-2 text-base p-3 rounded-md w-full transition-all ${activeSection === "home" ? "bg-cyan-700" : "hover:bg-cyan-700"}`}>
              <FiHome size={20} /> <span>Home</span>
            </button>
            <button onClick={() => setActiveSection("community")} className={`flex items-center space-x-2 text-base p-3 rounded-md w-full transition-all ${activeSection === "community" ? "bg-cyan-700" : "hover:bg-cyan-700"}`}>
              <FiUsers size={20} /> <span>Community</span>
            </button>
            <button onClick={() => setActiveSection("settings")} className={`flex items-center space-x-2 text-base p-3 rounded-md w-full transition-all ${activeSection === "settings" ? "bg-cyan-700" : "hover:bg-cyan-700"}`}>
              <FiSettings size={20} /> <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Logout Button (Fixed at Bottom) */}
        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-base p-3 rounded-md w-full transition-all hover:bg-cyan-700">
            <FiLogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <FiMenu size={24} />
          </button>
          <h2 className="text-lg font-bold text-gray-700">Dashboard</h2>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-all">
            <FiPlus size={20} /> <span>Create Question</span>
          </button>
        </div>

        {/* Create Question Form */}
        {showForm && (
          <div className="p-4 bg-white shadow-md rounded-lg w-full max-w-lg mx-auto mt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Post a Question</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded mb-2" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full p-2 border rounded mb-2"></textarea>
              <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <button type="submit" className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600">Submit</button>
            </form>
          </div>
        )}

        {/* Main Content Section */}
        <div className="p-6 w-full">
          {activeSection === "home" && (
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome to ByteAsk</h2>
              <p className="text-gray-600 mb-6 text-lg">Ask questions, engage in discussions, and grow your knowledge.</p>

              {/* Latest Questions Section */}
              <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Latest Questions</h2>
              <div className="space-y-4">
                {questions.length > 0 ? (
                  questions.map((q) => (
                    <div key={q._id} className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition-all">
                      <h3 className="text-lg font-semibold text-cyan-700">{q.title}</h3>
                      <p className="text-gray-600 mt-2">{q.description}</p>
                      <p className="text-gray-500 text-sm mt-3">📝 Posted by: {q.author}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-lg">No questions yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
