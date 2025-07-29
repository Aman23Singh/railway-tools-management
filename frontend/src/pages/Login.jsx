import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const res = await axios.post(`${API}/login`, form);
      const { token, user, message } = res.data;

      const userData = { ...user, token };
      login(userData);

      alert(message || 'Login successful');
      navigate('/todo');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-medium transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline font-medium">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
