import React from "react";

export default function UpgradeButton() {
  return (
    <div className="p-2">
      <button className="w-full bg-purple-600 bg-opacity-20 text-white py-2 px-4 rounded flex items-center justify-center">
        <span className="mr-2 text-white">↑</span> Upgrade to Plus
      </button>
    </div>
  );
}
