import React from "react";
import { Folder, Archive, HelpCircle, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ icon, label, to }) {
  const Icon = icon;
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-2 rounded ${
          isActive ? "bg-purple-700" : "hover:bg-purple-600"
        }`}
      >
        <Icon size={18} className="mr-2" />
        {label}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" }, // Added 'to' prop
    { icon: Folder, label: "All Projects", to: "/projects" },
    { icon: Archive, label: "Archived", to: "/archived" },
    { icon: HelpCircle, label: "Help & Support", to: "/help" },
  ];

  return (
    <nav className="flex-1">
      <ul className="space-y-2 px-2">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            to={item.to}
          /> // Pass 'to' prop
        ))}
      </ul>
    </nav>
  );
}
