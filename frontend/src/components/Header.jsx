import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
        🚂 Railway Tools
      </Link>

      <ul className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium text-gray-600">
        {user ? (
          <>
            <li>
              <Link to="/todo" className="hover:text-blue-600 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
