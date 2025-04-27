import React, { useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

const AskQuestion = ({ handleSubmit, setActiveSection }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      title,
      description,
      tags: tags.split(",").map(tag => tag.trim())
    });
    // Reset form after submission
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FiHelpCircle className="text-cyan-600" size={32} />
        <h2 className="text-3xl font-extrabold text-gray-800">Ask a Question</h2>
      </div>
      
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Question Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="What's your question?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 border-2 border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
            />
            <p className="mt-2 text-sm text-gray-500">Keep it clear and concise</p>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Explanation
            </label>
            <textarea
              id="description"
              placeholder="Elaborate your question here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-4 border-2 border-cyan-500 rounded-lg h-48 focus:ring-2 focus:ring-cyan-400 focus:outline-none resize-y transition-all"
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">Include all relevant details</p>
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              placeholder="e.g., javascript, react, programming"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-4 border-2 border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
            />
            <p className="mt-2 text-sm text-gray-500">Add up to 5 comma-separated tags</p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end border-t pt-6">
          <button
            type="button"
            onClick={() => setActiveSection("home")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium flex items-center gap-2"
          >
            <FiHelpCircle size={18} />
            Post Question
          </button>
        </div>
      </form>

      {/* Form Tips */}
      <div className="mt-8 p-6 bg-cyan-50 rounded-xl">
        <h3 className="text-lg font-semibold text-cyan-800 mb-3">Writing a Good Question</h3>
        <ul className="list-disc list-inside space-y-2 text-cyan-700">
          <li>Summarize your problem in a one-line title</li>
          <li>Describe what you tried and what you expected to happen</li>
          <li>Add relevant tags to help others find your question</li>
          <li>Be specific and provide details</li>
        </ul>
      </div>
    </div>
  );
};

export default AskQuestion;