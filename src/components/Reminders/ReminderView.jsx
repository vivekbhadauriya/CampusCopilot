// components/Reminders/RemindersView.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

const RemindersView = () => {
  const [showForm, setShowForm] = useState(false);
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Submit Math Assignment',
      description: 'Chapter 5 exercises 1-15',
      dueDate: '2025-05-10T23:59:00',
      priority: 'high',
      completed: false,
      category: 'academic'
    },
    {
      id: 2,
      title: 'Study Group Meeting',
      description: 'Library study room 3B',
      dueDate: '2025-05-09T15:00:00',
      priority: 'medium',
      completed: false,
      category: 'meeting'
    },
    {
      id: 3,
      title: 'Pick up textbooks',
      description: 'From campus bookstore',
      dueDate: '2025-05-08T17:00:00',
      priority: 'low',
      completed: true,
      category: 'errands'
    }
  ]);

  const addReminder = (newReminder) => {
    setReminders([...reminders, { ...newReminder, id: Date.now() }]);
    setShowForm(false);
  };

  const toggleReminderStatus = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-full p-6"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Reminders</h2>
          <p className="text-blue-300 text-sm mt-1">
            Stay on top of your tasks and deadlines
          </p>
        </div>
        
        <motion.button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>New Reminder</span>
        </motion.button>
      </div>
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Main content - Reminders list */}
        <motion.div className="flex-1 overflow-y-auto pr-4">
          <ReminderList 
            reminders={reminders} 
            toggleReminderStatus={toggleReminderStatus} 
            deleteReminder={deleteReminder}
          />
        </motion.div>
        
        {/* Side panel - Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="md:w-96 bg-gray-800 rounded-xl p-6 mt-4 md:mt-0 md:ml-4"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ReminderForm 
                onSubmit={addReminder} 
                onCancel={() => setShowForm(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RemindersView;