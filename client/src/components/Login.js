import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        navigate("/dashboard");
      } else {
        setError(data.msg || "Authentication failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section (Mobile) */}
      <div className="w-full md:hidden flex flex-col justify-center items-center bg-cyan-500 text-white p-8 text-center">
        <img src="/images/ByteAsk_Logo.png" alt="ByteAsk Logo" className="w-40 mb-4 drop-shadow-lg" />
        <h2 className="text-4xl font-extrabold mb-3">Welcome to ByteAsk</h2>
        <p className="text-lg leading-relaxed max-w-sm font-medium">
          Your ultimate hub for expert tech discussions, collaboration, and knowledge sharing.
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 flex flex-col flex-grow justify-center items-center px-12 py-14 bg-white shadow-lg rounded-xl max-w-md mx-auto md:mt-0 mt-auto">
        <h2 className="text-4xl font-extrabold text-cyan-600 mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth} className="space-y-6 w-full">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all text-lg font-semibold">
            {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-6 w-full space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all font-medium text-gray-700"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-6 h-6 mr-3" />
            {isLogin ? "Continue with Google" : "Sign up with Google"}
          </button>
        </div>

        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600 font-medium">
            {isLogin ? "New to ByteAsk?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-600 font-semibold hover:underline ml-1">
              {isLogin ? "Create an account" : "Login here"}
            </button>
          </p>
        </div>
      </div>

      {/* Left Section (Desktop) */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-cyan-500 text-white p-8 text-center">
        <img src="/images/ByteAsk_Logo.png" alt="ByteAsk Logo" className="w-60 mb-4 drop-shadow-lg" />
        <h2 className="text-5xl font-extrabold mb-3">Welcome to ByteAsk</h2>
        <p className="text-lg max-w-lg leading-relaxed font-medium">
          Elevate your learning and knowledge sharing with ByteAsk – the go-to platform for meaningful tech discussions and networking.
        </p>
      </div>
    </div>
  );
};

export default Login;