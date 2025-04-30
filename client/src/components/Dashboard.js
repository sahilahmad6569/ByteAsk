import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiMenu,
  FiHome,
  FiSettings,
  FiX,
  FiSearch,
  FiHelpCircle,
  FiUser,
  FiMessageSquare,
  FiTrendingUp,
  FiBarChart2,
  FiMessageCircle,
  FiStar // Added for points icon
} from "react-icons/fi";

import Home from "./Home";
import AskQuestion from "./AskQuestion";
import MyQuestions from "./MyQuestions";
import AnswerQuestions from "./AnswerQuestions";
import Trending from "./Trending";
import Analytics from "./Analytics";
import AskDoubtWithAI from "./AskDoubtWithAI";
import Settings from "./Settings";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPointsMenu, setShowPointsMenu] = useState(false);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const pointsButtonRef = useRef(null);

  const userStats = {
    points: 2450,
    badges: ['Gold Contributor', 'Quick Responder', 'Community Star'],
    votes: {
      received: 890,
      given: 345
    }
  };

  const profileButtonRef = useRef(null); // Add this line

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      fetchUserProfile(token);
    }

    fetchLatestQuestions();
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      if (activeSection !== 'home') {
        setActiveSection('home');
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeSection]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle sidebar closing only for mobile
      if (window.innerWidth < 768) {
        if (sidebarOpen &&
          !sidebarRef.current?.contains(event.target) &&
          !menuButtonRef.current?.contains(event.target)) {
          setSidebarOpen(false);
        }
      }

      // Always handle dropdown closing regardless of screen size
      if (showPointsMenu && !pointsButtonRef.current?.contains(event.target)) {
        setShowPointsMenu(false);
      }

      if (showProfileMenu && !profileButtonRef.current?.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen, showPointsMenu, showProfileMenu]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await response.json();
      if (response.ok) {
        localStorage.setItem("userProfile", JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = questions.filter(q =>
      q.title.toLowerCase().includes(query) ||
      q.description.toLowerCase().includes(query)
    );
    setFilteredQuestions(filtered);
  };

  const handleQuestionSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/questions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setQuestions([data, ...questions]);
        setFilteredQuestions([data, ...questions]);
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleLogout = () => setShowLogoutDialog(true);
  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-cyan-600 text-white w-48 p-4 flex flex-col justify-between transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:relative md:translate-x-0 shadow-lg z-50 h-screen`}
      >
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold">ByteAsk</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white md:hidden"
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
              <FiMessageCircle size={20} /> <span>Ask with AI</span>
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
        {/* Updated Top Navbar */}
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
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-500" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-2 border-2 border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Points Dropdown */}
            <div className="relative" ref={pointsButtonRef}>
              <button
                onClick={() => {
                  setShowPointsMenu(!showPointsMenu);
                  setShowProfileMenu(false);
                }}
                className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-lg hover:bg-cyan-100 transition-colors"
              >
                <FiStar className="text-cyan-600" />
                <span className="font-medium text-cyan-700">{userStats.points}</span>
              </button>

              {showPointsMenu && (
                <div className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <h3 className="font-medium text-gray-700">Your Achievements</h3>
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Badges Earned</h4>
                      <div className="flex flex-wrap gap-2">
                        {userStats.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Votes</h4>
                      <div className="flex justify-between text-sm">
                        <div className="text-green-600">
                          ▲ {userStats.votes.received} Received
                        </div>
                        <div className="text-cyan-600">
                          ▼ {userStats.votes.given} Given
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <button className="w-full text-left px-2 py-1 text-sm text-cyan-600 hover:bg-gray-50">
                        View Full Statistics →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section (Unchanged) */}
            {user && (
              <div
                className="relative flex items-center gap-4"
                ref={profileButtonRef} // Add this ref
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowPointsMenu(false);
                  }}
                >
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
        </div>

        {/* Main Content Section */}
        <div className="p-6 w-full">
          {(() => {
            switch (activeSection) {
              case "home":
                return <Home filteredQuestions={filteredQuestions} setActiveSection={setActiveSection} />;
              case "ask-question":
                return <AskQuestion handleSubmit={handleQuestionSubmit} setActiveSection={setActiveSection} />;
              case "my-questions":
                return <MyQuestions questions={questions.filter(q => q.isOwner)} />;
              case "answer-questions":
                return <AnswerQuestions questions={questions.filter(q => q.answersCount === 0)} />;
              case "trending":
                return <Trending questions={questions.filter(q => q.views > 1000)} />;
              case "analytics":
                return <Analytics />;
              case "ask-ai":
                return <AskDoubtWithAI />;
              case "settings":
                return <Settings />;
              default:
                return null;
            }
          })()}
        </div>

        {/* Logout Dialog */}
        {showLogoutDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutDialog(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;