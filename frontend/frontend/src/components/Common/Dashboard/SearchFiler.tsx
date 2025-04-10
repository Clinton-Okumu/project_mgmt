import React from "react";

const SearchFilter: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
      </div>
      <div>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center">
          <span>All Projects</span>
          <span className="ml-2">▼</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
