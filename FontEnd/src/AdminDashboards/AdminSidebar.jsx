// src/components/Sidebar.jsx
import React from 'react';
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaBriefcase,
  FaCog,
  FaSignOutAlt,
  FaUserTie
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login/admin');
  };

  const menuItems = [
    { name: 'DashBoard', icon: <FaUsers />, path: '/admin/dashboard' },
    { name: 'Alumni', icon: <FaUsers />, path: '/admin/alumni' },
    { name: 'Events', icon: <FaCalendarAlt />, path: '/admin/events' },
    { name: 'Placements', icon: <FaBriefcase />, path: '/admin/placements' },
    { name: 'Alumni List', icon: <FaUserTie />, path: '/admin/Alumnilist' },
    { name: 'Students List', icon: <FaUserTie />, path: '/admin/students' },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-purple-900 via-indigo-900 to-indigo-800 text-white flex flex-col p-6 min-h-screen shadow-2xl">
      {/* Logo */}
      <div className="flex items-center mb-10 pl-2">
        <span className="text-4xl font-bold tracking-tight text-white">ATME</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-3">
              <Link
                to={item.path}
                className="flex items-center w-full p-3 rounded-xl text-indigo-200 hover:text-white hover:bg-indigo-600 hover:scale-105 transition-all duration-300"
              >
                <span className="mr-4 text-2xl">{item.icon}</span>
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-indigo-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-xl text-left text-red-400 hover:bg-red-700 hover:text-white transition-all duration-300 shadow-lg"
        >
          <span className="mr-4 text-xl"><FaSignOutAlt /></span>
          <span className="font-medium text-lg">Logout</span>
        </button>
        <div className="text-xs text-gray-300 mt-4 text-center">v1.0</div>
      </div>
    </div>
  );
};

export default Sidebar;
