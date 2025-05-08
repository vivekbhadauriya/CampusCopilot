// components/Layout/Sidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'reminders', icon: '⏰', label: 'Reminders' },
    { id: 'schedule', icon: '📅', label: 'Schedule' },
    { id: 'about', icon: 'ℹ️', label: 'About' },
  ];

  return (
    <motion.div 
      className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-700"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">C</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            CampusCopilot
          </h1>
        </div>
        <p className="text-sm text-gray-400 ml-1 mt-2">Your AI wingman for college life!</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pt-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-150 ${
                  activeTab === item.id
                    ? 'bg-blue-700 bg-opacity-50 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-blue-400 rounded-r"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

    </motion.div>
  );
};

export default Sidebar;