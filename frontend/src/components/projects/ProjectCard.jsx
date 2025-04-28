
import React from "react";
import { CalendarDays, Users, User } from "lucide-react";

const ProjectCard = ({ name, description, is_team_project, created_at }) => {
  return (
    <div className="max-w-sm w-full bg-gray-800 rounded-lg p-5 mb-4 hover:bg-gray-700 transition-colors shadow-md">
      <h3 className="text-white text-lg font-semibold mb-1">{name}</h3>
      <p className="text-gray-400 text-sm mb-3">{description}</p>

      <div className="flex items-center text-gray-400 text-sm mb-2">
        {is_team_project ? (
          <>
            <Users className="w-4 h-4 mr-2" />
            Team Project
          </>
        ) : (
          <>
            <User className="w-4 h-4 mr-2" />
            Personal Project
          </>
        )}
      </div>

      <div className="flex items-center text-gray-400 text-sm mb-3">
        <CalendarDays className="w-4 h-4 mr-2" />
        {new Date(created_at).toLocaleDateString()}
      </div>

      <div className="flex justify-end">
        <button className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

