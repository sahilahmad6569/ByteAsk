import React from "react";

const Trending = ({ questions }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Trending Discussions</h2>
      
      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-cyan-700 mb-2">
                  {question.title}
                </h3>
                <p className="text-gray-600">{question.description}</p>
              </div>

              {/* Engagement Metrics */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1">
                    🔥 {question.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    💬 {question.answersCount} answers
                  </span>
                </div>
                <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">
                  Trending
                </span>
              </div>

              {/* Additional Metadata */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    📅 Posted {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                  {question.tags?.length > 0 && (
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
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">No trending discussions yet</p>
            <p className="text-gray-500 mt-2">
              Check back later for hot topics!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

Trending.defaultProps = {
  questions: [],
};

export default Trending;