import React from "react";
import { Folder, Archive, HelpCircle } from "lucide-react";

function NavItem({ icon, label }) {
  const Icon = icon;
  return (
    <li>
      <a href="#" className="flex items-center p-2 hover:bg-purple-600 rounded">
        <Icon size={18} className="mr-2" />
        {label}
      </a>
    </li>
  );
}

export default function Navigation() {
  const navItems = [
    { icon: Folder, label: "Dashboard" },
    { icon: Folder, label: "All Projects" },
    { icon: Archive, label: "Archived" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <nav className="flex-1">
      <ul className="space-y-2 px-2">
        {navItems.map((item, index) => (
          <NavItem key={index} icon={item.icon} label={item.label} />
        ))}
      </ul>
    </nav>
  );
}
