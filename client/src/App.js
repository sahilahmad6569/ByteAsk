import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Create a separate component to handle token extraction and redirection
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      // Save token to localStorage
      localStorage.setItem("authToken", token);
      // Redirect to dashboard
      navigate("/dashboard");
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

// Wrap the AppContent component with the Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;