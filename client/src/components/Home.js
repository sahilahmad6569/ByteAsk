import React from "react";
import {
  FiHelpCircle,
  FiUser,
  FiMessageSquare,
  FiTrendingUp,
  FiBarChart2,
  FiMessageCircle,
} from "react-icons/fi";

const Home = ({ filteredQuestions, setActiveSection }) => {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Welcome to ByteAsk
        </h2>
        <p className="text-gray-600 text-lg">
          Ask questions, engage in discussions, and grow your knowledge.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Ask Question Card */}
        <div
          onClick={() => setActiveSection("ask-question")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <FiHelpCircle className="text-white mb-4" size={40} />
          <h3 className="text-xl font-bold text-white mb-2">Ask Question</h3>
          <p className="text-blue-100">
            Start a new discussion by asking your question
          </p>
        </div>

        {/* My Questions Card */}
        <div
          onClick={() => setActiveSection("my-questions")}
          className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <FiUser className="text-white mb-4" size={40} />
          <h3 className="text-xl font-bold text-white mb-2">My Questions</h3>
          <p className="text-green-100">
            View and manage your posted questions
          </p>
        </div>

        {/* Answer Questions Card */}
        <div
          onClick={() => setActiveSection("answer-questions")}
          className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <FiMessageSquare className="text-white mb-4" size={40} />
          <h3 className="text-xl font-bold text-white mb-2">Answer Questions</h3>
          <p className="text-orange-100">
            Help others by answering unanswered questions
          </p>
        </div>

        {/* Trending Card */}
        <div
          onClick={() => setActiveSection("trending")}
          className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <FiTrendingUp className="text-white mb-4" size={40} />
          <h3 className="text-xl font-bold text-white mb-2">Trending</h3>
          <p className="text-pink-100">
            Explore hottest discussions in the community
          </p>
        </div>

        {/* Analytics Card */}
        <div
          onClick={() => setActiveSection("analytics")}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <FiBarChart2 className="text-white mb-4" size={40} />
          <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
          <p className="text-indigo-100">
            Track your engagement and activity stats
          </p>
        </div>

        {/* Ask AI Card */}
        <div
          onClick={() => setActiveSection("ask-ai")}
          className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <FiMessageCircle className="text-white mb-4" size={40} />
          <h3 className="text-xl font-bold text-white mb-2">Ask Doubt with AI</h3>
          <p className="text-yellow-100">
            Get instant AI-powered explanations and solutions
          </p>
        </div>
      </div>

      {/* Latest Questions Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          Latest Questions
        </h2>
        <div className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <div
                key={question._id}
                className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-cyan-700 mb-2">
                  {question.title}
                </h3>
                <p className="text-gray-600 mb-4">{question.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    📝 Posted by: {question.authorName || "Anonymous"}
                  </span>
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 px-2 py-1 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No questions found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;