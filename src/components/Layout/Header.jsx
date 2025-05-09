import React from 'react';
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/chat": return "Chat with CampusCopilot";
      case "/reminders": return "Your Reminders";
      case "/food": return "Find Food";
      case "/about": return "About CampusCopilot";
      default: return "Welcome to CampusCopilot";
    }
  };
  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <h2 className="text-xl font-semibold text-white">{getTitle()}</h2>
    </header>
  );
};

export default Header;