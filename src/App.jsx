// App.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import ChatWindow from './components/Chat/ChatWindow';
import ReminderView from './components/Reminders/ReminderView';
// import ScheduleView from './components/Schedule/ScheduleView';
// import AboutView from './components/About/AboutView';
import HomePage from './HomePage';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'chat':
        return <ChatWindow key="chat" />;
      case 'reminders':
        return <ReminderView key="reminders" />;
      case 'schedule':
        return <ScheduleView key="schedule" />;
      case 'about':
        return <AboutView key="about" />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <LoadingScreen key="loading" />
        ) : (
          <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </Layout>
        )}
      </AnimatePresence>
    </div>
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