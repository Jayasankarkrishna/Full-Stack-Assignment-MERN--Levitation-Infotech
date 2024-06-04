import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assests/logo.png";


interface Product {
  name: string;
  quantity: number;
  rate: number;
}

const AddProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([{ name: '', quantity: 0, rate: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (index: number, field: string, value: string | number) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: 0, rate: 0 }]);
  };

  const handleNext = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/products/product', { products });

      if (response.status !== 200) {
        throw new Error('Failed to save products');
      }

      navigate('/generate-pdf', { state: { products } });
    } catch (err) {
      setError('Failed to save products');
    } finally {
      setLoading(false);
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
      <h2 className="text-2xl font-bold mb-6 text-center">Add Products</h2>
      {products.map((product, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
          <div className="mb-2">
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.quantity}
              onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Rate</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              value={product.rate}
              onChange={(e) => handleChange(index, 'rate', Number(e.target.value))}
            />
          </div>
        </div>
      ))}
       <div className="flex justify-between mb-4">
      <button className="mb-4 p-2 bg-green-500 text-white rounded " onClick={handleAddProduct} disabled={loading}>
        Add Another Product
      </button>
      <button className="p-2 bg-blue-500 text-white rounded" onClick={handleNext} disabled={loading}>
        {loading ? 'Saving...' : 'Next'}
      </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default AddProduct;
