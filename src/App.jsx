// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from './components/Layout/Layout';
import ChatWindow from './components/Chat/ChatWindow';
import RemindersView from './components/Reminders/ReminderView';
import FoodSearch from './components/FoodFinder/FoodSearch';
import AboutView from './components/About/AboutView';
// import ScheduleView from './components/Schedule/ScheduleView';
// import AboutView from './components/About/AboutView';
import HomePage from './HomePage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return <LoadingScreen />;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatWindow />} />
          <Route path="/reminders" element={<RemindersView />} />
          {/* Add more routes as needed */}
          <Route path="/about" element={<AboutView />} />
          <Route path="food" element={<FoodSearch />}/>
        </Routes>
      </Layout>
    </Router>
  );
}

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-3xl text-white font-bold">C</span>
        </div>
        <div className="text-4xl font-bold text-white tracking-wider">
          CampusCopilot
        </div>
      </div>
      <div className="mt-8 flex space-x-2">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div 
            key={dot}
            className="h-3 w-3 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: `${dot * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;