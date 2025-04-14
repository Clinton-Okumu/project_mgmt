import React from "react";
import { Folder, Settings, LogOut } from "lucide-react";

function UserNavItem({ icon, label }) {
  const Icon = icon;
  return (
    <li>
      <a
        href="#"
        className="flex items-center p-2 hover:bg-gray-800 rounded text-sm"
      >
        <Icon size={16} className="mr-2" />
        {label}
      </a>
    </li>
  );
}

export default function UserNavigation() {
  const userNavItems = [
    { icon: Folder, label: "My Subscription" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Sign Out" },
  ];

  return (
    <ul className="space-y-2">
      {userNavItems.map((item, index) => (
        <UserNavItem key={index} icon={item.icon} label={item.label} />
      ))}
    </ul>
  );
}
