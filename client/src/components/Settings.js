import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiBell, FiSave } from "react-icons/fi";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    notifications: true,
    securityUpdates: true
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FiUser className="text-cyan-600" size={32} />
        <h2 className="text-3xl font-extrabold text-gray-800">Account Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FiUser className="text-cyan-600" /> Profile Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiUser /> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border-2 border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiMail /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border-2 border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FiBell className="text-cyan-600" /> Notifications
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="h-5 w-5 text-cyan-600 border-2 border-gray-300 rounded focus:ring-cyan-500"
              />
              <span className="text-gray-700">Receive notifications</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="securityUpdates"
                checked={formData.securityUpdates}
                onChange={handleChange}
                className="h-5 w-5 text-cyan-600 border-2 border-gray-300 rounded focus:ring-cyan-500"
              />
              <span className="text-gray-700">Security updates</span>
            </label>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FiLock className="text-cyan-600" /> Security
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiLock /> New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
          >
            <FiSave size={20} /> Save Changes
          </button>
        </div>

        {showSuccess && (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg mt-4">
            Settings updated successfully!
          </div>
        )}
      </form>

      <div className="mt-8 p-6 bg-cyan-50 rounded-xl">
        <h3 className="text-lg font-semibold text-cyan-800 mb-3">Security Tips</h3>
        <ul className="list-disc list-inside space-y-2 text-cyan-700">
          <li>Use a strong, unique password</li>
          <li>Enable two-factor authentication if available</li>
          <li>Regularly review your security settings</li>
          <li>Keep your contact information up to date</li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;