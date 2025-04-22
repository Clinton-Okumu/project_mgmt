import React from "react";
import { Folder, Settings, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function UserNavItem({ icon, label, onClick }) {
  const Icon = icon;
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center p-2 hover:bg-purple-600 rounded text-sm w-full text-left"
      >
        <Icon size={16} className="mr-2" />
        {label}
      </button>
    </li>
  );
}

export default function UserNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  const userNavItems = [
    { icon: Folder, label: "My Subscription" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Sign Out", onClick: handleLogout },
  ];

  return (
    <ul className="space-y-2">
      {userNavItems.map((item, index) => (
        <UserNavItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          to={item.to}
          isActive={item.to && location.pathname.startsWith(item.to)}
        />
      ))}
    </ul>
  );
}
