import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import logo from '../assests/logo.png';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  console.log("errors",error);

  console.log("first",loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Changed state name to errorMessage
  const navigate = useNavigate();

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields."); // Set error message
      return;
    }
    try {
  
      await dispatch(loginUser({ email, password }));

      console.log("errors",error);

      if (error) {
        navigate("/add-product");

      
      }else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle the error, e.g., display an error message
      setErrorMessage("server error"); // Set error message
    }
  };



  return (
<div className="min-h-screen bg-gray-50">
    <nav className="flex items-center justify-between bg-gray-900 text-white p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 mr-4" /> {/* Add the logo image */}
        <h1 className="text-2xl font-bold"> Levitation Infotech</h1>
      </div>
      {/* Add your navbar links here */}
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
          <a href="#" className="hover:text-gray-300">About</a>
        </li>
        {/* Add more navbar links as needed */}
      </ul>
    </nav>
    <div className="flex items-center justify-center">
      <form className="w-full max-w-sm p-8 bg-white rounded shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>} {/* Display error message */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
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
          <label htmlFor="password" className="block mb-1">Password</label>
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
          className={`w-full py-2 bg-blue-500 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  </div>
);
};

export default Login;

