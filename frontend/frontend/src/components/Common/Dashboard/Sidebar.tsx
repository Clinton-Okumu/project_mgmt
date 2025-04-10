import React from "react";

interface SidebarProps {
  user: {
    name: string;
    email: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navItems = [
    { icon: "grid", label: "Dashboard", path: "/dashboard" },
    { icon: "layers", label: "All Projects", path: "/projects" },
    { icon: "archive", label: "Archived", path: "/archived" },
    { icon: "help-circle", label: "Help & Support", path: "/help" },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
            <span className="text-purple-600 dark:text-purple-300 font-bold">
              SwiftBoard
            </span>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      <div className="p-4">
        <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 py-2 px-4 rounded flex items-center justify-center">
          <span className="mr-2">↑</span>
          Upgrade to Plus
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="mr-3">{/* Icon placeholder */}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 w-64 border-t border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-3">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div>
          <a
            href="/subscription"
            className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="mr-3">{/* Icon placeholder */}</span>
            My Subscription
          </a>
          <a
            href="/settings"
            className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="mr-3">{/* Icon placeholder */}</span>
            Settings
          </a>
          <a
            href="/logout"
            className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="mr-3">{/* Icon placeholder */}</span>
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
