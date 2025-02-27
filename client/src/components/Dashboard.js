import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiHome, FiSettings, FiX, FiSearch, FiHelpCircle, FiUser, FiMessageSquare, FiTrendingUp, FiBarChart2, FiMessageCircle } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Fetch user profile and questions on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user profile from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If user profile is not found, fetch it from the backend
      fetchUserProfile(token);
    }

    // Fetch latest questions
    fetchLatestQuestions();
  }, [navigate]);

  // Fetch user profile from the backend
  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      if (response.ok) {
        localStorage.setItem("userProfile", JSON.stringify(userData));
        setUser(userData);
      } else {
        console.error("Failed to fetch user profile:", userData);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Add this useEffect hook near your other useEffect hooks
  useEffect(() => {
    const handlePopState = () => {
      if (activeSection !== 'home') {
        // Set to home section and update history to prevent navigation
        setActiveSection('home');
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeSection]); // Dependency ensures current section state is fresh

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if we're on mobile and sidebar is open
      if (window.innerWidth >= 768) return;

      // Check if click is outside both sidebar and menu button
      if (
        sidebarOpen &&
        !sidebarRef.current?.contains(event.target) &&
        !menuButtonRef.current?.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  // Fetch latest questions from the backend
  const fetchLatestQuestions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/questions/latest`);
      const data = await response.json();
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Handle search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = questions.filter(
      (q) => q.title.toLowerCase().includes(query) || q.description.toLowerCase().includes(query)
    );
    setFilteredQuestions(filtered);
  };

  // Handle logout confirmation dialog
  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  // Confirm logout and clear localStorage
  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  // Handle create question submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/questions/create`, {
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

  // Render content based on active section
  const renderSectionContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Welcome to ByteAsk</h2>
            <p className="text-gray-600 mb-6 text-lg">Ask questions, engage in discussions, and grow your knowledge.</p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Ask Question Card */}
              <div
                onClick={() => setActiveSection("ask-question")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiHelpCircle className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Ask Question</h3>
                <p className="text-blue-100">Start a new discussion by asking your question</p>
              </div>

              {/* My Questions Card */}
              <div
                onClick={() => setActiveSection("my-questions")}
                className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiUser className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">My Questions</h3>
                <p className="text-green-100">View and manage your posted questions</p>
              </div>

              {/* Answer Questions Card */}
              <div
                onClick={() => setActiveSection("answer-questions")}
                className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiMessageSquare className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Answer Questions</h3>
                <p className="text-orange-100">Help others by answering unanswered questions</p>
              </div>

              {/* Trending Card */}
              <div
                onClick={() => setActiveSection("trending")}
                className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiTrendingUp className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Trending</h3>
                <p className="text-pink-100">Explore hottest discussions in the community</p>
              </div>

              {/* Analytics Card */}
              <div
                onClick={() => setActiveSection("analytics")}
                className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiBarChart2 className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
                <p className="text-indigo-100">Track your engagement and activity stats</p>
              </div>

              {/* Ask AI Card */}
              <div
                onClick={() => setActiveSection("ask-ai")}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <FiMessageCircle className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Ask Doubt with AI</h3>
                <p className="text-yellow-100">Get instant AI-powered explanations and solutions</p>
              </div>
            </div>

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
          </>
        );

      case "ask-question":
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Ask a Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-600"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-600"
              ></textarea>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-600"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Post Question
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection("home")}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        );

      case "my-questions":
        return (
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Questions</h2>
            <div className="space-y-4">
              {questions.filter((q) => q.isOwner).map((q) => (
                <div key={q._id} className="bg-white shadow-md p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-cyan-700">{q.title}</h3>
                  <p className="text-gray-600 mt-2">{q.description}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-sm bg-cyan-100 text-cyan-700 px-2 py-1 rounded">Your Question</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "answer-questions":
        return (
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Unanswered Questions</h2>
            <div className="space-y-4">
              {questions.filter((q) => q.answersCount === 0).map((q) => (
                <div key={q._id} className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-cyan-700">{q.title}</h3>
                  <p className="text-gray-600 mt-2">{q.description}</p>
                  <button className="mt-3 text-cyan-600 hover:text-cyan-700 font-medium">
                    Answer Question →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "trending":
        return (
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Trending Discussions</h2>
            <div className="space-y-4">
              {questions.filter((q) => q.views > 1000).map((q) => (
                <div key={q._id} className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-cyan-700">{q.title}</h3>
                  <p className="text-gray-600 mt-2">{q.description}</p>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <span>🔥 {q.views} views</span>
                    <span>💬 {q.answersCount} answers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Your Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
                <div className="space-y-3">
                  <p>📝 Questions Posted: 12</p>
                  <p>💬 Answers Provided: 34</p>
                  <p>👀 Profile Views: 567</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Engagement Stats</h3>
                <div className="space-y-3">
                  <p>📈 Total Votes Received: 89</p>
                  <p>🏆 Best Answers: 5</p>
                  <p>⭐ Community Rating: 4.8/5</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "ask-ai":
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">AI Doubt Solver</h2>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="space-y-4">
                <textarea
                  placeholder="Type your question here..."
                  className="w-full p-4 border-2 border-cyan-500 rounded-lg h-48 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>
                <button className="w-full bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors">
                  Analyze with AI
                </button>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
                  <p className="text-gray-600">Your AI-powered explanation will appear here...</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-cyan-600 text-white w-48 md:w-44 lg:w-48 p-4 flex flex-col justify-between transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:relative md:translate-x-0 shadow-lg z-50 h-screen overflow-y-hidden`}
      >
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold">ByteAsk</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white md:hidden absolute top-4 right-4"
            >
              <FiX size={24} />
            </button>
          </div>

          <nav className="mt-6 space-y-3">
            <button
              onClick={() => setActiveSection("home")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "home" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiHome size={20} /> <span>Home</span>
            </button>

            <button
              onClick={() => setActiveSection("ask-question")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "ask-question" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiHelpCircle size={20} /> <span>Ask Question</span>
            </button>

            <button
              onClick={() => setActiveSection("my-questions")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "my-questions" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiUser size={20} /> <span>My Questions</span>
            </button>

            <button
              onClick={() => setActiveSection("answer-questions")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "answer-questions" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiMessageSquare size={20} /> <span className="whitespace-nowrap">Write Answers</span>
            </button>

            <button
              onClick={() => setActiveSection("trending")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "trending" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiTrendingUp size={20} /> <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "analytics" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiBarChart2 size={20} /> <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveSection("ask-ai")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "ask-ai" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiMessageCircle size={20} />
              <span className="whitespace-nowrap">Ask with AI</span>
            </button>

            <button
              onClick={() => setActiveSection("settings")}
              className={`flex items-center space-x-2 p-3 rounded-md w-full ${activeSection === "settings" ? "bg-cyan-700" : "hover:bg-cyan-700"
                }`}
            >
              <FiSettings size={20} /> <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center space-x-2 p-3 rounded-md w-full hover:bg-cyan-700">
            <FiLogOut size={20} /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              ref={menuButtonRef}
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <FiMenu size={24} />
            </button>

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
          </div>

          {/* Profile Section */}
          {user && (
            <div className="relative flex items-center gap-4">
              <div className="cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-medium text-lg">
                    {user.name[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content Section */}
        <div className="p-6 w-full">
          {renderSectionContent()}
        </div>

        {/* Logout Dialog */}
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
      </div>
    </div>
  );
};

export default Dashboard;