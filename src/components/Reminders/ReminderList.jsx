// components/Reminders/ReminderList.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReminderList = ({ reminders, toggleReminderStatus, deleteReminder }) => {
  // Get today's reminders
  const todayReminders = reminders.filter(reminder => {
    const today = new Date();
    const dueDate = new Date(reminder.dueDate);
    return dueDate.getDate() === today.getDate() && 
           dueDate.getMonth() === today.getMonth() && 
           dueDate.getFullYear() === today.getFullYear() &&
           !reminder.completed;
  });

  // Get upcoming reminders (not today but not completed)
  const upcomingReminders = reminders.filter(reminder => {
    const today = new Date();
    const dueDate = new Date(reminder.dueDate);
    return !(dueDate.getDate() === today.getDate() && 
           dueDate.getMonth() === today.getMonth() && 
           dueDate.getFullYear() === today.getFullYear()) &&
           !reminder.completed;
  });

  // Get completed reminders
  const completedReminders = reminders.filter(reminder => reminder.completed);

  const reminderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ReminderItem = ({ reminder }) => {
    const priorityColors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    
    const categoryIcons = {
      academic: '📚',
      meeting: '👥',
      errands: '🏃',
      default: '📝'
    };

    return (
      <motion.div 
        className={`bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3 ${
          reminder.completed ? 'opacity-60' : ''
        }`}
        variants={reminderVariants}
        layout
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => toggleReminderStatus(reminder.id)}
              className={`flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 border-blue-500 flex items-center justify-center ${
                reminder.completed ? 'bg-blue-500' : 'bg-transparent'
              }`}
            >
              {reminder.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {categoryIcons[reminder.category] || categoryIcons.default}
                </span>
                <h3 className={`font-medium ${reminder.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                  {reminder.title}
                </h3>
                <span className={`${priorityColors[reminder.priority]} h-2 w-2 rounded-full`}></span>
              </div>
              
              {reminder.description && (
                <p className="text-gray-400 text-sm mt-1">{reminder.description}</p>
              )}
              
              <div className="text-xs text-gray-500 mt-2">
                Due: {formatDate(reminder.dueDate)}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <motion.button 
              className="text-gray-400 hover:text-blue-400 p-1"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </motion.button>
            
            <motion.button 
              className="text-gray-400 hover:text-red-400 p-1"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteReminder(reminder.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Today's reminders */}
      <div>
        <h3 className="text-lg font-medium text-blue-400 mb-4 flex items-center">
          <span className="mr-2">📅</span> Today
          {todayReminders.length > 0 && (
            <span className="ml-2 bg-blue-600 text-xs text-white px-2 py-1 rounded-full">
              {todayReminders.length}
            </span>
          )}
        </h3>
        
        <AnimatePresence>
          {todayReminders.length > 0 ? (
            <motion.div layout>
              {todayReminders.map(reminder => (
                <ReminderItem key={reminder.id} reminder={reminder} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4 text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No reminders for today!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Upcoming reminders */}
      <div>
        <h3 className="text-lg font-medium text-blue-400 mb-4 flex items-center">
          <span className="mr-2">🔜</span> Upcoming
          {upcomingReminders.length > 0 && (
            <span className="ml-2 bg-blue-600 text-xs text-white px-2 py-1 rounded-full">
              {upcomingReminders.length}
            </span>
          )}
        </h3>
        
        <AnimatePresence>
          {upcomingReminders.length > 0 ? (
            <motion.div layout>
              {upcomingReminders.map(reminder => (
                <ReminderItem key={reminder.id} reminder={reminder} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4 text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No upcoming reminders!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Completed reminders */}
      {completedReminders.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-green-400 mb-4 flex items-center">
            <span className="mr-2">✅</span> Completed
            <span className="ml-2 bg-green-600 text-xs text-white px-2 py-1 rounded-full">
              {completedReminders.length}
            </span>
          </h3>
          
          <AnimatePresence>
            <motion.div layout>
              {completedReminders.map(reminder => (
                <ReminderItem key={reminder.id} reminder={reminder} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ReminderList;