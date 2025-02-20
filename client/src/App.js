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
    const urlToken = queryParams.get("token");

    if (urlToken) {
      // Save token to localStorage
      localStorage.setItem("authToken", urlToken);
      // Redirect to dashboard
      navigate("/dashboard", { replace: true });
    } else {
      // If no token in URL, check if a token already exists in localStorage
      const storedToken = localStorage.getItem("authToken");
      if (storedToken && (location.pathname === "/" || location.pathname === "/login")) {
        navigate("/dashboard", { replace: true });
      }
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