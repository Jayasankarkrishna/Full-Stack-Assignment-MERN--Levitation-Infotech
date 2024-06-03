import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between bg-gray-900 text-white p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-4" />{" "}
          <h1 className="text-2xl font-bold">Company Name</h1>
        </div>
        <ul className="flex">
          <li className="mr-6">
            <button
              className="hover:text-gray-300"
              onClick={() => navigate("/")}
            >
              Logout
            </button>
          </li>
          <li className="mr-6">
            <a href="#" className="hover:text-gray-300">
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-center">
        <form className="w-full max-w-sm p-8 bg-white rounded shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Register"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="text-center mt-4">
            Already have an account?{" "}
            <button
              className="text-blue-500 underline focus:outline-none"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
