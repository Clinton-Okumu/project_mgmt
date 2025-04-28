
import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";

const ProjectCard = ({ title, description, status, date, progress }) => {
  return (
    <div className="max-w-sm w-full bg-gray-800 rounded-lg p-5 mb-4 hover:bg-gray-700 transition-colors shadow-md">
      <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>

      <div className="mb-3">
        <span className="bg-orange-700 text-orange-100 text-xs font-medium px-3 py-1 rounded-full">
          {status}
        </span>
      </div>

      <div className="flex items-center text-gray-400 text-sm mb-3">
        <CalendarDays className="w-4 h-4 mr-2" />
        {date}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray-300 text-sm">{progress}% Complete</div>
        <button className="text-orange-400 hover:text-orange-300 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
