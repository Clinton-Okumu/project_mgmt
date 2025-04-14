import React from "react";
import Logo from "./Logo";
import UpgradeButton from "./UpgradeButton";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import UserNavigation from "./UserNavigation";

export default function Sidebar() {
  return (
    <div className="w-56 border-r border-gray-800 flex flex-col">
      <Logo />
      <UpgradeButton />
      <Navigation />

      <div className="border-t border-gray-800 p-4">
        <UserProfile name="Clinton" email="clin@gmail.com" />
        <UserNavigation />
      </div>
    </div>
  );
}
