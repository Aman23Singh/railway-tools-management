import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FrontPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [todoData, setTodoData] = useState([]);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${API}/departments`);
        setDepartments(res.data);
      } catch (err) {
        console.error('Failed to load departments:', err);
      }
    };
    fetchDepartments();
  }, []);

  const handleClick = async (dept) => {
    setSelectedDept(dept);
    try {
      const res = await axios.get(`${API}/todo/${dept}`);
      setTodoData(res.data);
    } catch (err) {
      console.error('Failed to load todo data:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 underline underline-offset-4">
          Department List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {departments.map((dept) => (
            <div
              key={dept}
              onClick={() => handleClick(dept)}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform text-center border-t-4 border-purple-400"
            >
              <h2 className="text-xl font-semibold text-purple-700">{dept}</h2>
            </div>
          ))}
        </div>

        {selectedDept && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Tools in "{selectedDept}" Department:
            </h2>
            {todoData.length === 0 ? (
              <p className="text-gray-600">No tools found.</p>
            ) : (
              <ul className="space-y-3">
                {todoData.map((tool) => (
                  <li
                    key={tool._id}
                    className="bg-gray-100 p-4 rounded-md border-l-4 border-indigo-400 shadow-sm"
                  >
                    <span className="font-medium">{tool.tool}</span> — Quantity: {tool.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontPage;
