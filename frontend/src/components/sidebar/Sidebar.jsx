import React from "react";
import Logo from "./Logo";
import UpgradeButton from "./UpgradeButton";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import UserNavigation from "./UserNavigation";

export default function Sidebar() {
  return (
    <div className="w-56 border-r border-gray-800 flex flex-col h-full justify-between">
      {" "}
      <div className="">
        {" "}
        <div className="mb-6">
          <Logo />
        </div>
        <div className="mb-8">
          <UpgradeButton />
        </div>
        <nav className="mb-8 flex-grow">
          {" "}
          <Navigation />
        </nav>
      </div>
      <div className="border-t border-gray-800 p-4">
        <div className="mb-4">
          <UserProfile name="Clinton" email="clin@gmail.com" />
        </div>
        <UserNavigation />
      </div>
    </div>
  );
}
