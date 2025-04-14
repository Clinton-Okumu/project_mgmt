import React from "react";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <div className="p-4 flex items-center text-purple-400 font-semibold text-xl">
      <img src={logo} alt="SwiftBoard Logo" className="w-6 h-6 mr-2" />
      SwiftPjmt
    </div>
  );
}
