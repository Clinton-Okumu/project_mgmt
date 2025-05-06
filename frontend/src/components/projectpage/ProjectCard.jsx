
import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ProjectCard = ({
    id,
    name,
    description,
    is_team_project,
    created_at,
    progress = 45,
    status = "To Do",
}) => {
    const navigate = useNavigate();

    const statusColors = {
        "To Do": "bg-blue-500",
        "In Progress": "bg-yellow-500",
        "Completed": "bg-green-500",
    };

    const handleViewDetails = () => {
        navigate(`/view-details`);
    };

    return (
        <div className="max-w-sm w-full bg-gray-800 rounded-lg p-5 mb-4 hover:bg-gray-700 transition-colors shadow-md">
            <h3 className="text-white text-lg font-semibold mb-1">{name}</h3>
            <p className="text-gray-400 text-sm mb-3">{description}</p>

            {/* Status Badge */}
            <div className="mb-3">
                <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[status] || 'bg-gray-500'} text-white`}
                >
                    {status}
                </span>
            </div>

            {/* Team/Personal */}
            <div className="flex items-center text-gray-400 text-sm mb-3">
                {is_team_project ? (
                    <span className="mr-2 text-green-300">Team Project</span>
                ) : (
                    <span className="mr-2 text-yellow-300">Personal Project</span>
                )}
            </div>

            {/* Created Date */}
            <div className="flex items-center text-gray-400 text-sm mb-3">
                <CalendarDays className="w-4 h-4 mr-2" />
                {dayjs(created_at).format("MMM D, YYYY")}
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <span className="text-gray-400 text-xs">Progress</span>
                        <span className="text-gray-400 text-xs">{progress}%</span>
                    </div>
                    <div className="flex mb-2">
                        <div className="flex-1 bg-gray-600 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Details */}
            <div className="flex justify-end">
                <button
                    onClick={handleViewDetails}
                    className="text-orange-400 hover:text-orange-300 transition-colors text-sm underline"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;

