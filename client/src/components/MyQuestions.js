import React from "react";

const MyQuestions = ({ questions }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Questions</h2>
      
      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-cyan-700 mb-2">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{question.description}</p>
                </div>
                <span className="text-sm bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full ml-4">
                  Your Question
                </span>
              </div>

              {/* Question Metadata */}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
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
                  <span>
                    📅 {new Date(question.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>💬 {question.answersCount || 0} answers</span>
                  <span>👁️ {question.views || 0} views</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">
              You haven't asked any questions yet.
            </p>
            <p className="text-cyan-600 mt-2 hover:text-cyan-700 cursor-pointer">
              Ask your first question!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

MyQuestions.defaultProps = {
  questions: [],
};

export default MyQuestions;