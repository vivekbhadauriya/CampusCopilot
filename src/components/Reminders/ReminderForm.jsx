// components/Reminders/ReminderForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReminderForm = ({ reminder = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: reminder.title || '',
    description: reminder.description || '',
    dueDate: reminder.dueDate ? new Date(reminder.dueDate).toISOString().substr(0, 16) : '',
    priority: reminder.priority || 'medium',
    category: reminder.category || 'academic'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      completed: reminder.completed || false
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">
          {reminder.id ? 'Edit Reminder' : 'New Reminder'}
        </h3>
        <motion.button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What needs to be done?"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add details about this reminder"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
            Due Date & Time
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="academic">Academic</option>
              <option value="meeting">Meeting</option>
              <option value="errands">Errands</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex space-x-3">
          <motion.button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {reminder.id ? 'Update Reminder' : 'Create Reminder'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-600 hover:bg-gray-700 text-gray-300 rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ReminderForm;