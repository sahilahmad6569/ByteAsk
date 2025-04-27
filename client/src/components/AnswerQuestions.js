import React from "react";

const AnswerQuestions = ({ questions }) => {
  const handleAnswerSubmit = (questionId) => {
    // Implement answer submission logic here
    console.log("Answering question:", questionId);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Unanswered Questions</h2>
      
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

              {/* Question Metadata */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>
                    📅 Asked on {new Date(question.createdAt).toLocaleDateString()}
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
                <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">
                  {question.views || 0} views
                </span>
              </div>

              {/* Answer Section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleAnswerSubmit(question._id)}
                  className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-2"
                >
                  <span>Write Answer</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">All caught up! 🎉</p>
            <p className="text-gray-500 mt-2">
              There are currently no unanswered questions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

AnswerQuestions.defaultProps = {
  questions: [],
};

export default AnswerQuestions;