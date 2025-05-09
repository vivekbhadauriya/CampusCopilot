import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Chat", path: "/chat" },
  { label: "Reminders", path: "/reminders" },
  { label: "Food Finder", path: "/food" },
  { label: "About", path: "/about" }
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col py-8 px-4">
      <div className="mb-10 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">C</div>
        <span className="text-xl font-bold">CampusCopilot</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;