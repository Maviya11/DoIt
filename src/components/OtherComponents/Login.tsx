import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { authenticationContext } from "../../App";

const Login = () => {
  const setIsAuthenticated = useContext(authenticationContext);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    JSON.stringify(localStorage.setItem("isAuthenticated", "true"));
    if (setIsAuthenticated) setIsAuthenticated(true);
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOffOutline className="h-5 w-5" />
                ) : (
                  <IoEyeOutline className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600/50 text-white py-2 px-4 rounded-md hover:bg-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
