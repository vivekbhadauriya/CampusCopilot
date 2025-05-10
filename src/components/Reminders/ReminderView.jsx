import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';
import { getReminders, addReminder, deleteReminder, toggleReminder } from '../../Services/api';

const RemindersView = () => {
  const [showForm, setShowForm] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setError(null);
      const data = await getReminders();
      setReminders(data);
    } catch (err) {
      setError('Failed to fetch reminders. Please check if the backend server is running.');
      console.error('Error fetching reminders:', err);
    }
  };

  const handleAddReminder = async (newReminder) => {
    try {
      setError(null);
      await addReminder(newReminder);
      await fetchReminders();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create reminder. Please try again.');
      console.error('Error creating reminder:', err);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      setError(null);
      await deleteReminder(id);
      await fetchReminders();
    } catch (err) {
      setError('Failed to delete reminder. Please try again.');
      console.error('Error deleting reminder:', err);
    }
  };

  const handleToggleReminder = async (id) => {
    try {
      setError(null);
      await toggleReminder(id);
      await fetchReminders();
    } catch (err) {
      setError('Failed to update reminder. Please try again.');
      console.error('Error toggling reminder:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div className="flex flex-col h-full p-6" initial="hidden" animate="visible" exit={{ opacity: 0 }} variants={containerVariants}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Reminders</h2>
          <p className="text-blue-300 text-sm mt-1">Stay on top of your tasks and deadlines</p>
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

      {error && (
        <div className="mb-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row h-full">
        <motion.div className="flex-1 overflow-y-auto pr-4">
          <ReminderList 
            reminders={reminders} 
            toggleReminderStatus={handleToggleReminder} 
            deleteReminder={handleDeleteReminder}
          />
        </motion.div>
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
                onSubmit={handleAddReminder} 
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