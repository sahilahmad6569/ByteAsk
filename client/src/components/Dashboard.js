import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiHome, FiUsers, FiSettings, FiX, FiPlus, FiSearch } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    fetchLatestQuestions();
  }, [navigate]);

  const fetchLatestQuestions = async () => {
    try {
      const response = await fetch("http://byteask.onrender.com/api/questions/latest");
      const data = await response.json();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // ✅ Search Bar Functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = questions.filter(
      (q) => q.title.toLowerCase().includes(query) || q.description.toLowerCase().includes(query)
    );
    setFilteredQuestions(filtered);
  };

  // ✅ Handle Logout Confirmation Dialog
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // ✅ Handle Create Question Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://byteask.onrender.com/api/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, tags: tags.split(",") }),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions([data, ...questions]);
        setFilteredQuestions([data, ...questions]);
        setShowForm(false);
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
        {/* Top Navbar with Search Bar */}
        {/* Top Navbar with Search Bar & Button */}
        <div className="bg-white shadow-md p-4 flex flex-col md:flex-row md:justify-between items-center gap-4 sticky top-0 z-10">

          {/* Mobile Menu Button */}
          <button onClick={() => setSidebarOpen(true)} className="md:hidden self-start">
            <FiMenu size={24} />
          </button>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-lg">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-2 border-2 border-cyan-500 text-cyan-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-600 transition-all duration-200"
            />
          </div>

          {/* Create Question Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto flex items-center justify-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-all"
          >
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

        {/* Custom Logout Confirmation Dialog */}
        {showLogoutDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
              <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-4">
                <button onClick={() => setShowLogoutDialog(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={confirmLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
              </div>
            </div>
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
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
                    <div key={q._id} className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition-all">
                      <h3 className="text-lg font-semibold text-cyan-700">{q.title}</h3>
                      <p className="text-gray-600 mt-2">{q.description}</p>
                      <p className="text-gray-500 text-sm mt-3">📝 Posted by: {q.authorName || "Anonymous"}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-lg">No matching questions.</p>
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