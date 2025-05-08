import { useState } from 'react';

export default function ArchivedProjects() {
  const [archivedProjects, setArchivedProjects] = useState([]);

  const loadArchivedProjects = () => {
    setArchivedProjects([
      { id: 4, title: "Old Website Version 1", description: "Archived version of the first company website", status: "Completed", dueDate: "2024-01-15" },
      { id: 5, title: "Mobile App v1.0 - Deprecated", description: "The initial release of the mobile app", status: "Completed", dueDate: "2024-05-20" },
      // ... more archived projects
    ]);
  };

  const clearArchivedProjects = () => {
    setArchivedProjects([]);
  };

  const getStatusColor = (status) => {
    // ... (same getStatusColor function)
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {/* ... (icon) ... */}
          <h1 className="text-xl font-bold text-white-800">Archived Projects ({archivedProjects.length})</h1>
        </div>

        {/* Demo button for archived projects */}
        <button
          onClick={archivedProjects.length === 0 ? loadArchivedProjects : clearArchivedProjects}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          {archivedProjects.length === 0 ? "Load Archived Projects" : "Clear Archived Projects"}
        </button>
      </div>

      {archivedProjects.length === 0 ? (
        <div className="w-full bg-gray-800 bg-opacity-10 rounded-lg p-12 flex items-center justify-center">
          <p className="text-gray-500 text-lg">No archived projects</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
