import React from 'react';

const PageHeader = ({ title, backLink, backText }) => {
  return (
    <div className="flex items-center mb-4">
      {backLink && backText && (
        <a 
          href={backLink} 
          className="flex items-center text-gray-400 hover:text-purple-400 mr-4 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          {backText}
        </a>
      )}
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default PageHeader;
