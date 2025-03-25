import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!username) newErrors.username = "Username or email is required.";

    // Validate password
    if (!password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Show loading state during API call
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect based on role
        if (data.role === "admin") {
          window.location.href = "/admin-navbar";
        } else {
          window.location.href = "/user-dashboard";
        }
      } else {
        setErrors({ form: data.message });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors({ form: "An error occurred. Please try again." });
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-emerald-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Welcome Back!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Log in to continue to your account.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`block w-full px-4 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-sm text-green-600 hover:text-green-800 focus:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {errors.form && (
          <p className="text-sm text-red-500 text-center mt-4">{errors.form}</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
