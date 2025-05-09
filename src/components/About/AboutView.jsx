import React from "react";

const AboutView = () => (
  <div className="p-8 text-white max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-4">About CampusCopilot</h1>
    <p className="mb-2">
      <b>CampusCopilot</b> is your AI-powered wingman for college life. Get instant answers, reminders, food recommendations, and more—all in one place!
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>Ask questions about campus life, exams, and deadlines</li>
      <li>Set and manage reminders for assignments and events</li>
      <li>Find the best food options near you</li>
      <li>Navigate campus facilities with ease</li>
    </ul>
    <p>
      Built with ❤️ by team CodeTitans
    </p>
  </div>
);

export default AboutView;