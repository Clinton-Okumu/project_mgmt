import React from "react";

interface StatsProps {
  stats: {
    totalProjects: number;
    preLaunch: number;
    launched: number;
    thisMonth: number;
  };
}

const StatCards: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
          <span className="text-purple-600 dark:text-purple-300">🚀</span>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Projects
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {stats.totalProjects}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
          <span className="text-yellow-600 dark:text-yellow-300">⏰</span>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pre-launch</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {stats.preLaunch}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
          <span className="text-green-600 dark:text-green-300">✓</span>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Launched</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {stats.launched}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
          <span className="text-purple-600 dark:text-purple-300">📅</span>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {stats.thisMonth}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
