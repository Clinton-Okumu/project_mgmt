import React from 'react';

const Checkbox = ({ name, checked, onChange, label }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
          checked 
            ? 'bg-purple-600 border-purple-600' 
            : 'bg-gray-800 border-gray-600'
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </div>
      </div>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
