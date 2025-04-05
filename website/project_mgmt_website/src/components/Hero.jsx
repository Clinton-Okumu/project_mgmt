import React from "react";
import pic1 from "../assets/pic1.png"; // Make sure to import the image

const Hero = () => {
  return (
    <div className="bg-[#EAE6FE] pt-16 pb-24 px-4 md:px-6 flex flex-col items-center">
      {/* Rocket icon */}
      <div className="mb-6">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 18C32.2091 18 34 16.2091 34 14C34 11.7909 32.2091 10 30 10C27.7909 10 26 11.7909 26 14C26 16.2091 27.7909 18 30 18Z" fill="#9333EA" />
          <path d="M38 10C42 6 44 4 44 4L44.5 3.5C44.5 3.5 40 2 32 6C24 10 20 18 20 18L12 26C10 28 10 32 12 34C14 36 18 36 20 34L28 26C28 26 36 22 40 14C44 6 42.5 3.5 42.5 3.5L42 4C42 4 40 6 38 10Z" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 32L4 44" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 24L14 34" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Main headline */}
      <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-800 mb-4">
        Project Management,
      </h1>

      {/* Subheadline */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-purple-600 mb-6">
        Simplified for Developers
      </h2>

      {/* Description text */}
      <p className="text-center text-gray-600 max-w-2xl mb-2">
        The lightweight alternative to complex project management tools.
      </p>
      <p className="text-center text-purple-600 font-medium mb-10">
        Perfect for solo projects and small indie teams.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-md">
          Start for Free
        </button>
        <button className="border border-purple-600 text-purple-600 hover:bg-purple-100 hover:border-purple-700 px-8 py-3 rounded-lg font-medium transition-all duration-200">
          Sign In
        </button>
      </div>

      {/* Hero image */}
      <div className="max-w-4xl w-full">
        <img
          src={pic1}
          alt="SwiftBoard Dashboard Preview"
          className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
        />
      </div>
    </div>
  );
};

export default Hero;
