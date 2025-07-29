import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-5 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/todo" className="hover:bg-gray-700 p-2 rounded">Tool List</Link>
        <Link to="/add-tool" className="hover:bg-gray-700 p-2 rounded">Add Tool</Link>
        <Link to="/login" className="hover:bg-gray-700 p-2 rounded">Logout</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
