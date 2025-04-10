import React from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  dueDate?: string;
  progress: number;
}

interface ProjectsListProps {
  title: string;
  projects: Project[];
  emptyMessage: string;
  type: "favorite" | "active" | "archived";
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  title,
  projects,
  emptyMessage,
  type,
}) => {
  const getIcon = () => {
    switch (type) {
      case "favorite":
        return "⭐";
      case "active":
        return "📁";
      case "archived":
        return "📦";
      default:
        return "📝";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center">
          <span className="mr-2">{getIcon()}</span>
          {title}
          {projects.length > 0 && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({projects.length})
            </span>
          )}
        </h2>
      </div>

      {projects.length === 0 ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {project.description}
                  </p>
                  {project.status === "pre-launch" && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Pre-launch
                    </span>
                  )}
                </div>
                <div className="mt-3 sm:mt-0 flex flex-col items-end">
                  {project.dueDate && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span className="mr-1">📅</span> {project.dueDate}
                    </div>
                  )}
                  <div className="w-full sm:w-32">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {project.progress}% Complete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
