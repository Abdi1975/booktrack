import React from 'react';

const EmptyState = ({ darkMode, message }) => (
  <div className="text-center py-12">
    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      {message}
    </p>
  </div>
);

export default EmptyState;