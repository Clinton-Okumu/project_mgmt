import React from 'react';

const FormField = ({ label, children, required = false, optional = false }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2">
        {label}
        {required && <span className="text-purple-400 ml-1">*</span>}
        {optional && <span className="text-gray-500 text-sm ml-2">(optional)</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;
