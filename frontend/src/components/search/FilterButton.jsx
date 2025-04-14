import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative flex-1 mr-4">
      <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
      <input
        type="text"
        placeholder="Search projects..."
        className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
      />
    </div>
  );
}
