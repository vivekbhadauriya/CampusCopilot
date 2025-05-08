// components/Layout/Header.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = ({ activeTab, setActiveTab }) => {
  const [searchValue, setSearchValue] = useState('');
  
  const getTabTitle = () => {
    const titles = {
      'home': 'Welcome to CampusCopilot',
      'chat': 'Chat with CampusCopilot',
      'reminders': 'Your Reminders',
      'schedule': 'Class Schedule',
      'about': 'About CampusCopilot'
    };
    return titles[activeTab] || 'CampusCopilot';
  };
  
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <motion.div 
          className="flex items-center space-x-4"
          layout
        >
          <motion.h2 
            className="text-xl font-semibold text-white"
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getTabTitle()}
          </motion.h2>
          
          {activeTab === 'chat' && (
            <motion.div 
              className="flex items-center space-x-1 bg-blue-600 bg-opacity-30 px-3 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-blue-300">AI Assistant Online</span>
            </motion.div>
          )}
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-64 bg-gray-800 text-white border border-gray-700 rounded-full py-2 pl-10 pr-4 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
          
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            U
          </motion.div>
        </div>
      </div>
      
      {activeTab !== 'home' && (
        <div className="flex px-6 py-2 space-x-6 overflow-x-auto bg-gray-800 scrollbar-thin scrollbar-thumb-gray-600">
          {activeTab === 'chat' && (
            <>
              <TabButton label="General Questions" isActive={true} />
              <TabButton label="Campus Facilities" />
              <TabButton label="Food Options" />
              <TabButton label="Academic Help" />
            </>
          )}
          {activeTab === 'reminders' && (
            <>
              <TabButton label="Today" isActive={true} />
              <TabButton label="Upcoming" />
              <TabButton label="Completed" />
              <TabButton label="All" />
            </>
          )}
          {activeTab === 'schedule' && (
            <>
              <TabButton label="Week View" isActive={true} />
              <TabButton label="Month View" />
              <TabButton label="Calendar" />
              <TabButton label="Courses" />
            </>
          )}
          {activeTab === 'about' && (
            <>
              <TabButton label="Features" isActive={true} />
              <TabButton label="Help" />
              <TabButton label="FAQ" />
              <TabButton label="Contact" />
            </>
          )}
        </div>
      )}
    </header>
  );
};

const TabButton = ({ label, isActive = false }) => (
  <motion.button
    className={`py-1 px-4 text-sm rounded-full ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-gray-700'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.button>
);

export default Header;