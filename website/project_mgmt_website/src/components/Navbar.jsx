import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const NavbarLinks = [
  { id: 1, title: "Features", link: "#" },
  { id: 2, title: "Comparison", link: "#" },
  { id: 3, title: "Pricing", link: "#" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".nav-container")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div
      className={`w-full mx-auto px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 nav-container ${scrolled ? "bg-[#EAE6FE] shadow-sm" : "bg-[#EAE6FE]"
        }`}
    >
      {/* Logo section */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <p className="font-bold text-xl text-purple-600">
          SwiftPjmt
        </p>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-8">
          {NavbarLinks.map((link) => (
            <a
              key={link.id}
              className="font-medium text-gray-600 hover:text-purple-600 relative group transition-colors duration-200"
              href={link.link}
            >
              {link.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button className="text-gray-600 hover:text-purple-600 transition-colors duration-200" aria-label="Toggle dark mode">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <a className="font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200" href="/signin">
            Sign In
          </a>
          <a className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-md" href="/get-started">
            Get Started
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          className="p-2 text-gray-700 hover:text-purple-600 transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#EAE6FE] p-5 shadow-lg md:hidden animate-fade-in">
          <ul className="flex flex-col gap-4">
            {NavbarLinks.map((link) => (
              <li key={link.id} className="border-b border-purple-100 pb-2">
                <a
                  className="block text-gray-600 hover:text-purple-600 hover:pl-2 transition-all duration-200 text-lg font-medium"
                  href={link.link}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              </li>
            ))}
            <li className="pt-2 flex items-center justify-between">
              <a className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200" href="/signin">
                Sign In
              </a>
              <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-md">
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
