import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assests/logo.png";

const GeneratePDF: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { products } = location.state as {
    products: { name: string; quantity: number; rate: number }[];
  };
  console.log("products", products);

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/invoice/generate",
        { products },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between bg-gray-900 text-white p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-4" />{" "}
          {/* Add the logo image */}
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
            <a href="#" className="hover:text-gray-300">
              About
            </a>
          </li>
          {/* Add more navbar links as needed */}
        </ul>
      </nav>
      <div className="flex items-center justify-center">
        <form className="w-full max-w-sm p-8 bg-white rounded shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Generate PDF</h2>
          <button
            className="mb-4 p-2 bg-green-500 text-white rounded justify-center"
            onClick={handleGenerate}
          >
            Generate PDF
          </button>
        </form>
      </div>
    </div>
  );
};
export default GeneratePDF;
