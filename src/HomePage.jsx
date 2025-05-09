// components/Home/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Chat",
      description: "Get instant answers about campus life",
      icon: "💬",
      color: "bg-purple-600",
      path: "/chat"
    },
    {
      title: "Reminders",
      description: "Never miss an assignment or deadline",
      icon: "⏰",
      color: "bg-green-600",
      path: "/reminders"
    },
    {
      title: "Schedule",
      description: "Plan your classes and activities",
      icon: "📅",
      color: "bg-pink-600",
      path: "/schedule"
    },
    {
      title: "Campus Map",
      description: "Find your way around campus facilities",
      icon: "🗺️",
      color: "bg-yellow-600",
      path: "/chat"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const gradientTextStyle = {
    backgroundImage: "linear-gradient(45deg, #4f46e5, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "100%",
    backgroundClip: "text"
  };

  return (
    <motion.div 
      className="w-full py-12 px-8 flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-16" 
        variants={titleVariants}
      >
        <h1 className="text-5xl font-bold mb-6" style={gradientTextStyle}>
          CampusCopilot
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Your AI companion for navigating college life. Get help with assignments, 
          schedule management, campus navigation, and more.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`${feature.color} bg-opacity-10 border border-${feature.color.split('-')[1]}-400 border-opacity-30 p-6 rounded-xl 
            backdrop-blur-sm cursor-pointer`}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => navigate(feature.path)}
          >
            <div className="flex items-start space-x-4">
              <div className={`${feature.color} bg-opacity-30 p-3 rounded-lg text-2xl`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100 opacity-90">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full
          transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/chat')}
        >
          Get Started with Chat
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;