import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; 

const LoginForm = ({ email, password, showPassword, setEmail, setPassword, setShowPassword, handleAuth, error, isLoading }) => {
  return (
    <form onSubmit={handleAuth} className="space-y-6 w-full">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff className="w-6 h-6" /> : <FiEye className="w-6 h-6" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all text-lg font-semibold"
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;