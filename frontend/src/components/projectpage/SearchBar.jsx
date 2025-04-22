import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const statusOptions = ["All Status", "To Do", "In Progress", "Done"];
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      {/* Input */}
      <div className="relative w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-sm text-gray-300 py-1.5 pl-9 pr-3 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
      </div>

      {/* Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-gray-800 text-sm text-gray-300 py-1.5 px-3 rounded-md flex items-center hover:bg-gray-700"
        >
          {selectedStatus}
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded shadow-md z-10 w-full sm:w-40">
            {statusOptions.map((status) => (
              <div
                key={status}
                onClick={() => handleStatusSelect(status)}
                className="text-gray-300 text-sm py-2 px-3 cursor-pointer hover:bg-gray-600"
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
