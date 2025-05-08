// components/Chat/ChatMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ChatMessage = ({ message }) => {
  const { sender, text, timestamp } = message;
  const isBot = sender === 'bot';

  // Format time
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <motion.div
      className={`flex mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} max-w-4xl`}>
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'} flex items-start`}>
          {isBot ? (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <span className="text-xl">🤖</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              U
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <div 
            className={`px-4 py-3 rounded-2xl ${
              isBot 
                ? 'bg-gray-800 text-white rounded-tl-none'
                : 'bg-blue-600 text-white rounded-tr-none'
            }`}
          >
            <p className="text-sm sm:text-base">{text}</p>
          </div>
          
          <span 
            className={`text-xs text-gray-400 mt-1 ${
              isBot ? 'ml-2' : 'mr-2 text-right'
            }`}
          >
            {formattedTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;