// components/Login.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Load remembered email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      // No navigate – effect will handle it
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = () => {
    // Placeholder: implement Google sign-in with Firebase
    console.log("Google sign-in clicked");
    // You'll need to add Google auth provider and call signInWithPopup
  };

  const handleFacebookSignIn = () => {
    // Placeholder: implement Facebook sign-in with Firebase
    console.log("Facebook sign-in clicked");
    // You'll need to add Facebook auth provider and call signInWithPopup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-[#252f53be] p-8 rounded-3xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded text-black bg-white"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-100 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded text-black bg-white"
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-200 text-sm">Remember me</span>
            </label>
            {/* Forgot password link – optional */}
            {/* <a href="#" className="text-sm text-blue-400 hover:underline">Forgot Password?</a> */}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            LOGIN
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#252f53be] text-gray-300">- OR -</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleFacebookSignIn}
            className="bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors"
            aria-label="Sign in with Facebook"
          >
            f
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            aria-label="Sign in with Google"
          >
            G
          </button>
        </div>

        <p className="text-gray-300 mt-6 text-center">
          Don't have an Account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;