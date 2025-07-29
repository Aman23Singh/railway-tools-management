import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const Todo = () => {
  const { user } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchTools = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const res = await axios.get(`${API}/todo/${user.department}`);
        setTools(res.data);
      } catch (err) {
        console.error('Failed to fetch tools:', err);
      }
    };
    fetchTools();
  }, [user]);

  const handleAdd = async () => {
    if (!tool || !quantity || !user) return;
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const res = await axios.post(`${API}/todo`, {
        email: user.email,
        department: user.department,
        tool,
        quantity,
      });
      setTools([...tools, res.data]);
      setTool('');
      setQuantity('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      await axios.delete(`${API}/todo/${id}`);
      setTools(tools.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="text-center mt-4">Loading user...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h2 className="text-xl mb-2">Welcome, {user.email}</h2>
      <p className="mb-4">Department: {user.department}</p>

      <h3 className="text-lg font-semibold mb-2">Add Tool</h3>
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Tool name"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Your Tools</h3>
      <ul>
        {tools.map((item) => (
          <li key={item._id} className="flex items-center justify-between mb-2">
            {item.tool} - {item.quantity}
            <button
              onClick={() => handleDelete(item._id)}
              className="text-red-600 hover:text-red-800"
            >
             Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
