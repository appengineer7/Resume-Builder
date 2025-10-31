import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { Button } from "../components/ui/button";
import customIcon from "../assets/images/avatar-icons/customize.png";
import designIcon from "../assets/images/avatar-icons/design.png";
import atsIcon from "../assets/images/avatar-icons/ats1.png";
import propic from "../assets/images/avatar-icons/image.png";
import propic1 from "../assets/images/avatar-icons/image-1.png";
import propic2 from "../assets/images/avatar-icons/image-2.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import { useContext } from "react";

// Forgot Password Modal Component
const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          const successMesssage = data.message || "Reset link sent to your email!";
          setStatus(successMesssage);
          setErrors({});
          toast.success(successMesssage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { backgroundColor: "#d1fae5", color: "#065f46" },
          });
        } else {
          const errorMesssage = data.message || "Failed to send reset email.";
          setErrors({ general: errorMesssage });
          toast.error(errorMesssage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-500"
                  }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full px-6 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={onClose}
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Signup Modal Component
const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Account created successfully! Please log in.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          onClose();
        } else {
          const errorMesssage = data.message || "Signup failed. Please try again.";
          setErrors({ general: errorMesssage });
          toast.error(errorMesssage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
          });
        }
      } catch (error) {
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600">Join us and start building your perfect resume</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 ${errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-purple-500"
                  }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-purple-500"
                  }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 pr-12 transition-all duration-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 ${errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-purple-500"
                    }`}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 013.667-4.798m3.058-1.423A9.969 9.969 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.963 9.963 0 01-4.5 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="Privacy" className="text-purple-600 hover:text-purple-700 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="Privacy" className="text-purple-600 hover:text-purple-700 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full px-6 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onSwitchToSignup, onSwitchToForgotPassword,setIsLoggedIn }) => {
  const {setUser = () => {} } = useContext(AuthContext) ?? {};
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsLoggedIn(true);
        toast.success("Logged in successfully!");
        onClose();
        } else {
          const errorMesssage = data.message || "Login failed. Please try again.";
          setErrors({ general: errorMesssage });
          toast.error(errorMesssage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { backgroundColor: "#fee2e2", color: "#b91c1c" },
          });
        }
      } catch (error) {
        setErrors({ general: "Server error. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 500 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600">Sign in to access your resume builder</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-purple-500"
                  }`}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 pr-12 transition-all duration-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 ${errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-purple-500"
                    }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 013.667-4.798m3.058-1.423A9.969 9.969 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.963 9.963 0 01-4.5 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full px-6 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const location = useLocation();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const features = [
    {
      title: "Professional Templates",
      description: "Choose from dozens of professionally designed templates that make your resume stand out",
      image: designIcon,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-r from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Easy Customization",
      description: "Drag and drop interface makes editing your resume quick and intuitive",
      image: customIcon,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "ATS Friendly",
      description: "Optimized formats that pass through Applicant Tracking Systems seamlessly",
      image: atsIcon,
      color: "from-emerald-500 to-teal-500",
      gradient: "bg-gradient-to-r from-emerald-500/10 to-teal-500/10",
    },
  ];

  const testimonials = [
    {
      name: "Poul Anderson",
      role: "Software Engineer",
      content: "Landed my dream job at Google with the resume I created here. The templates are incredible!",
      avatar: propic,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "John Carter",
      role: "Product Manager",
      content: "The customization options are endless. My resume now perfectly represents my personal brand.",
      avatar: propic1,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Smith Morgan",
      role: "Marketing Director",
      content: "Went from 0 interviews to 5 offers in one month. This platform changed my career trajectory.",
      avatar: propic2,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/current-user", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowForgotPasswordModal(false);
  };

  const switchToSignup = () => {
    closeAllModals();
    setShowSignupModal(true);
  };

  const switchToForgotPassword = () => {
    closeAllModals();
    setShowForgotPasswordModal(true);
  };

  const switchToLoginFromSignup = () => {
    closeAllModals();
    setShowLoginModal(true);
  };

  const switchToLoginFromForgotPassword = () => {
    closeAllModals();
    setShowLoginModal(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setResetError("Invalid or missing token. Please check the reset link.");
      return;
    }
    if (!resetPassword) {
      setResetError("New password is required");
      return;
    }
    if (resetPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: resetPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setResetSuccess("Password reset successfully. Redirecting to login...");
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/");
          setResetError("");
          setResetSuccess("");
          setResetPassword("");
          setConfirmPassword("");
        }, 2000);
      } else {

        const errorMsg = data.message || "Failed to reset password";
        setResetError(errorMsg);

        toast.error(errorMsg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#E74C3C",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setResetError("Server error. Please try again later.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        toast.success("Logout successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "#27AE60",
            color: "#fff",
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (token && location.pathname.startsWith("/reset-password")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Back to home"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 013.667-4.798m3.058-1.423A9.969 9.969 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.963 9.963 0 01-4.5 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 013.667-4.798m3.058-1.423A9.969 9.969 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.963 9.963 0 01-4.5 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeAllModals}
        onSwitchToSignup={switchToSignup}
        onSwitchToForgotPassword={switchToForgotPassword}
        setIsLoggedIn={setIsLoggedIn}
      />
      <SignupModal
        isOpen={showSignupModal}
        onClose={closeAllModals}
        onSwitchToLogin={switchToLoginFromSignup}
      />
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={closeAllModals}
      />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-sm shadow-lg">
              New! AI-Powered Resume Suggestions
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Create Resumes That
            <motion.span
              className="block mt-4 bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotateX: 5 }}
            >
              Get You Hired
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Build professional resumes in minutes with our AI-powered builder.
            <span className="font-semibold text-purple-600">Stand out from the crowd</span>
            and land your dream job with confidence.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoggedIn ? (
              <>
                <Button
                  size="lg"
                  className="px-12 py-5 text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl"
                  onClick={() => navigate("/builder")}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-5 text-lg font-bold border-2 border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => navigate("/builder", { state: { step: 6 } })}
                >
                  View Templates
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  className="group relative px-12 py-5 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl"
                  onClick={handleLoginClick}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-5 text-lg font-bold border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={handleSignupClick}
                >
                  Create Account
                </Button>
              </>
            )}
          </motion.div>
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { number: "1K+", label: "Happy Users" },
              { number: "50+", label: "Templates" },
              { number: "95%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="relative py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-semibold text-sm mb-6">
              ✨ Featured
            </div>
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create a resume that <span className="font-semibold text-emerald-600">stands out</span>
              and gets you noticed by employers.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -12, rotateX: 2 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                <Card
                  className={`${feature.gradient} h-full border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-white/20`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="relative z-10 pt-8">
                    <motion.div
                      className="text-5xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                      animate={hoveredCard === index ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <span
                        className={`inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}
                      >
                        {feature.image ? (
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <span className="text-3xl">{feature.icon}</span>
                        )}
                      </span>
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </CardDescription>
                    <motion.div
                      className="mt-6 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </CardContent>
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    animate={hoveredCard === index ? { scale: 1.2, rotate: 180 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`p-8 rounded-3xl text-center relative overflow-hidden ${features[currentFeature].gradient} border border-white/20 backdrop-blur-sm`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${features[currentFeature].color} opacity-5`}></div>
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {features[currentFeature].image ? (
                  <img
                    src={features[currentFeature].image}
                    alt={features[currentFeature].title}
                    className="w-16 h-16 mx-auto object-contain"
                  />
                ) : (
                  <span>{features[currentFeature].icon}</span>
                )}
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 relative z-10">
                {features[currentFeature].title}
              </h3>
              <p className="text-gray-600 text-lg relative z-10 max-w-2xl mx-auto">
                {features[currentFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6 border border-white/20">
              💬 Success Stories
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See what our users are saying about their <span className="text-emerald-400 font-semibold">success stories</span>.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, rotateX: 5 }}
                className="group relative"
              >
                <Card className="border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardContent className="relative z-10 p-8">
                    <div className="flex items-start mb-6 mt-4">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-3 border-white/30 shadow-lg"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-6 h-6 ${testimonial.color} rounded-full flex items-center justify-center text-xs font-bold shadow-lg`}
                        >
                          ✨
                        </div>
                      </motion.div>
                      <div className="ml-4">
                        <h4 className="font-bold text-white mb-1">{testimonial.name}</h4>
                        <p className="text-white/70 text-sm font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-white/90 italic leading-relaxed relative z-10">"{testimonial.content}"</p>
                    <motion.div
                      className="flex items-center mt-6 pt-6 border-t border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                      <span className="text-emerald-300 text-sm font-semibold">Verified Success</span>
                    </motion.div>
                  </CardContent>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="relative py-24 bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-pink-200/30"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full text-lg mb-8 shadow-lg">
              Ready to Transform Your Career?
            </div>
            <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Create Your Perfect Resume Today
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join <span className="font-bold text-purple-600">thousands of professionals</span> who have
              transformed their careers with our AI-powered resume builder.
            </p>
            <div className="flex flex-col lg:flex-row gap-4 justify-center max-w-2xl mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full lg:w-2/3 h-14 text-lg border-2 border-purple-200/50 focus:border-purple-500 focus:ring-purple-500 rounded-2xl px-6 bg-white/80 backdrop-blur-sm"
              />
              {isLoggedIn ? (
                <Button
                  size="lg"
                  className="whitespace-nowrap h-14 px-10 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform transition-all duration-300 w-full lg:w-auto"
                  onClick={() => navigate("/builder")}
                >
                  Start Building Now
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="whitespace-nowrap h-14 px-10 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl transform transition-all duration-300 w-full lg:w-auto"
                  onClick={handleSignupClick}
                >
                  Start Building Now
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              {[
                { icon: "🔒", text: "Secure & Private" },
                { icon: "⚡", text: "Lightning Fast" },
                { icon: "💳", text: "No Credit Card" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-lg text-gray-500 font-semibold">
              No credit card required. <span className="text-purple-600">Free plan available.</span>
            </p>
          </motion.div>
        </div>
      </section>
      <footer className="py-12 bg-gradient-to-r from-slate-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">

            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
                ResumeBuilder
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Built by{" "}
                <a href="https://nexelix.tech/">
                  <span className="font-semibold text-purple-400 hover:underline">
                    Nexelix Tech
                  </span>
                </a>{" "}
                for job seekers everywhere. Helping you land your dream career.
              </p>
            </motion.div>

            {/* Link Sections */}
            {[
              { title: "Product", links: ["Templates", "Builder"] },
              { title: "Company", links: ["About", "Contact"] },
              { title: "Support", links: ["Privacy"] },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start"
              >
                <h4 className="font-bold text-gray-200 mb-3">{section.title}</h4>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.div key={linkIndex} whileHover={{ x: 2 }}>
                      {section.title === "Product" ? (
                        <button
                          onClick={() =>
                            link === "Templates"
                              ? navigate("/builder", { state: { step: 6 } })
                              : navigate(`/${link.toLowerCase()}`)
                          }
                          className="block text-gray-300 text-sm hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </button>
                      ) : (
                        <Link
                          to={`/${link.toLowerCase()}`}
                          className="block text-gray-300 text-sm hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
            {/* Account Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start"
            >
              <h4 className="font-bold text-gray-200 mb-3">Account</h4>
              <div className="space-y-2">
                {isLoggedIn ? (
                  <motion.div whileHover={{ x: 2 }}>
                    <button
                      onClick={handleLogout}
                      className="block text-gray-300 text-sm hover:text-white transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ x: 2 }}>
                    <Link
                      onClick={handleLoginClick}
                      className="block text-gray-300 text-sm hover:text-white transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
          {/* Divider & Bottom Note */}
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Resume Builder. All rights reserved.
              <span className="ml-2 text-purple-400">
                Made by{" "}
                <a href="https://nexelix.tech/">
                  <span className="hover:underline font-semibold text-purple-500">
                    Nexelix Tech
                  </span>
                </a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = `
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
`;

export default Home;