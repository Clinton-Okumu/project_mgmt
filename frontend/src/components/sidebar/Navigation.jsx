import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, List, Archive, HelpCircle } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: Layout },
  { path: "/projects", label: "All Projects", icon: List },
  { path: "/archived", label: "Archived", icon: Archive },
  { path: "/help", label: "Help & Support", icon: HelpCircle },
];

const Navigation = () => {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.path} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-2 rounded-md text-white hover:bg-gray-700 flex items-center space-x-2 ${
                  isActive ? "bg-gray-900" : ""
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* You can add other navigation items or user info here */}
    </nav>
  );
};

export default Navigation;
