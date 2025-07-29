import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-700 py-6 px-4 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold text-blue-800">Railway Tools Management</h3>
          <p className="text-sm text-gray-600">Tracking tools efficiently across departments</p>
        </div>

        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-blue-700 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-700 transition">Terms</a>
          <a href="#" className="hover:text-blue-700 transition">Support</a>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500 border-t border-blue-100 pt-3">
        © 2025 Railway Tools Management | Designed with ❤️ by <span className="text-blue-500">Aman Singh</span>
      </div>
    </footer>
  );
}
