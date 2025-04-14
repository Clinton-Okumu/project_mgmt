import React from "react";
import { Folder, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // To handle navigation

function UserNavItem({ icon, label, onClick }) {
  const Icon = icon;
  return (
    <li>
      <button // Changed 'a' tag to 'button' for functionality
        onClick={onClick}
        className="flex items-center p-2 hover:bg-purple-600 rounded text-sm w-full text-left" // Added w-full and text-left for better button styling
      >
        <Icon size={16} className="mr-2" />
        {label}
      </button>
    </li>
  );
}

export default function UserNavigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens from localStorage (or wherever you store them)
    localStorage.removeItem("access");
    localStorage.removeItem("userId");

    // Redirect the user to the login page
    navigate("/login");

    // Optionally, you might want to perform other cleanup tasks here,
    // like clearing user-specific data from your application state.
  };

  const userNavItems = [
    { icon: Folder, label: "My Subscription" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Sign Out", onClick: handleLogout }, // Added onClick handler
  ];

  return (
    <ul className="space-y-2">
      {userNavItems.map((item, index) => (
        <UserNavItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick} // Pass the onClick handler
        />
      ))}
    </ul>
  );
}
