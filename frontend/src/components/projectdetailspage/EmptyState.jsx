import React from 'react';

export const EmptyState = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">
        {description}
      </p>
      {buttonText && (
        <button 
          className="bg-purple-600 text-white px-3 py-1.5 rounded-md text-sm"
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
