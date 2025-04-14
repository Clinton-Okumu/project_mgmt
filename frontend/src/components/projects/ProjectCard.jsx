import React from "react";
import { Calendar, ChevronRight } from "lucide-react";

export default function ProjectCard({ project }) {
  const statusColors = {
    "pre-launch": "bg-yellow-500 bg-opacity-20 text-yellow-300",
    launched: "bg-green-500 bg-opacity-20 text-green-300",
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
      <h3 className="font-medium mb-1">{project.name}</h3>
      <p className="text-sm text-gray-400 mb-2">{project.description}</p>

      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-xs ${statusColors[project.status]} px-2 py-0.5 rounded`}
        >
          {project.status === "pre-launch" ? "Pre-launch" : "Launched"}
        </span>

        <div className="flex items-center text-gray-500 text-xs">
          <Calendar size={12} className="mr-1" />
          {project.date}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-xs">
          <span className="mr-1">{project.progress}% Complete</span>
        </div>

        <ChevronRight size={16} className="text-gray-500" />
      </div>
    </div>
  );
}
