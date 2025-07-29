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
    <div className="max-w-5xl mx-auto p-4 mb-[400px]">
      <h1 className="text-2xl font-bold mb-[50px] mt-[20px] mx-auto w-[300px]">Department List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {departments.map((dept) => (
          <div
            key={dept}
            onClick={() => handleClick(dept)}
            className="cursor-pointer border p-4 rounded shadow hover:bg-blue-50"
          >
            <h2 className="text-lg font-semibold text-center">{dept}</h2>
          </div>
        ))}
      </div>

      {selectedDept && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Tools in "{selectedDept}" Department:</h2>
          {todoData.length === 0 ? (
            <p>No tools found.</p>
          ) : (
            <ul className="space-y-2">
              {todoData.map((tool) => (
                <li key={tool._id} className="border p-2 rounded">
                  {tool.tool} - {tool.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FrontPage;
