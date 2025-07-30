import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const Todo = () => {
  const { user } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [tool, setTool] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTool, setEditTool] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchTools = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || 'https://railway-tools-management-oehh.vercel.app/';
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
      const API = import.meta.env.VITE_API_URL || 'https://railway-tools-management-oehh.vercel.app/';
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
      const API = import.meta.env.VITE_API_URL || 'https://railway-tools-management-oehh.vercel.app/';
      await axios.delete(`${API}/todo/${id}`);
      setTools(tools.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const API = import.meta.env.VITE_API_URL || 'https://railway-tools-management-oehh.vercel.app/';
      await axios.put(`${API}/todo/${id}`, {
        tool: editTool,
        quantity: editQuantity,
      });
      setTools(
        tools.map((item) =>
          item._id === id ? { ...item, tool: editTool, quantity: editQuantity } : item
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <p className="text-lg font-medium text-gray-700">Loading user...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">👋 Welcome, {user.email}</h2>
        <p className="text-sm text-gray-500 mb-6">Department: {user.department}</p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">➕ Add Tool</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              placeholder="Tool name"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-md transition"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">🧾 Your Tools</h3>
          {tools.length === 0 ? (
            <p className="text-gray-500">No tools added yet.</p>
          ) : (
            <ul className="space-y-3">
              {tools.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-3 shadow-sm hover:bg-gray-200 transition"
                >
                  {editingId === item._id ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        value={editTool}
                        onChange={(e) => setEditTool(e.target.value)}
                        className="p-1 border rounded"
                      />
                      <input
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(e.target.value)}
                        className="p-1 border rounded w-20"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {item.tool} - {item.quantity}
                    </span>
                  )}

                  <div className="flex gap-3 items-center">
                    {editingId === item._id ? (
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(item._id);
                          setEditTool(item.tool);
                          setEditQuantity(item.quantity);
                        }}
                        className="px-3 py-1 bg-emerald-400 text-white rounded hover:bg-emerald-600 text-sm"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-red-400 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
