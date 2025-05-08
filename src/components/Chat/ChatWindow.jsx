// components/Chat/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm CampusCopilot, your AI wingman for college life. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text) => {
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = {
        'hello': "Hey there! How's your day going?",
        'hi': "Hello! What can I help you with today?",
        'help': "I can help with information about exams, deadlines, campus facilities, or nearby food options. Just ask away!",
        'food': "There are several food options near campus! The Student Union has a food court with 5 restaurants. Downtown is a 10-minute walk with lots of options. What type of food are you looking for?",
        'exam': "Looking for exam information? I can help with schedules, study resources, and preparation tips. What specific course are you asking about?",
        'deadline': "Need help tracking deadlines? I can remind you about upcoming assignments and projects. Would you like me to set up a reminder for you?",
        'default': "Thanks for your message! I can help with campus information, schedules, and resources. Could you provide more details about what you're looking for?"
      };
      
      // Find response or use default
      let botReply = botResponses.default;
      for (const [key, value] of Object.entries(botResponses)) {
        if (text.toLowerCase().includes(key)) {
          botReply = value;
          break;
        }
      }
      
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botReply,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <motion.div 
      className="flex flex-col h-full p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 overflow-y-auto mb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div className="space-y-4 py-3">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2 mb-4"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 inline-block max-w-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </motion.div>
  );
};

export default ChatWindow;