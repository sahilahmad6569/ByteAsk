import React, { useState } from "react";
import { FiMessageCircle, FiLoader, FiSend } from "react-icons/fi";

const AskDoubtWithAI = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate AI API call
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResponse(`**AI Explanation:**\n\n${query} is a fundamental concept that... [Detailed explanation]`);
    } catch (error) {
      setResponse("⚠️ Error connecting to AI service. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FiMessageCircle className="text-cyan-600" size={32} />
        <h2 className="text-3xl font-extrabold text-gray-800">AI Doubt Solver</h2>
      </div>

      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="relative">
              <textarea
                placeholder="Type your question here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-4 border-2 border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-y min-h-[150px]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-4 bottom-4 bg-cyan-500 text-white p-2 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <FiLoader className="animate-spin" size={20} />
                ) : (
                  <FiSend size={20} />
                )}
              </button>
            </div>

            {response && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg transition-all">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FiMessageCircle className="text-cyan-600" />
                  AI Response:
                </h3>
                <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-cyan-50 rounded-xl">
        <h3 className="text-lg font-semibold text-cyan-800 mb-3">AI Assistant Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-cyan-700">
          <li>Be specific with your question for better results</li>
          <li>Include error messages if you're facing technical issues</li>
          <li>Ask follow-up questions to dive deeper into topics</li>
          <li>Review explanations and ask for clarification if needed</li>
        </ul>
      </div>
    </div>
  );
};

export default AskDoubtWithAI;