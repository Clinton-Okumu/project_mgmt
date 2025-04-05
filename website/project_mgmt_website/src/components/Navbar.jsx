
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const NavbarLinks = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "About", link: "#" },
  { id: 3, title: "Features", link: "#" },
  { id: 4, title: "Testimonials", link: "#" },
  { id: 5, title: "Contact", link: "#" },
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
      className={`w-full mx-auto px-4 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 nav-container ${scrolled ? "bg-white shadow-md" : "bg-white/95 border-b border-gray-200"
        }`}
    >
      {/* Logo section */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="FitJourney logo" className="w-[50px]" />
        <p className="font-bold text-xl text-gray-800">
          Fit<span className="text-orange-500">Journey</span>
        </p>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <ul className="flex gap-6">
          {NavbarLinks.map((link) => (
            <li key={link.id}>
              <a
                className="font-medium hover:text-orange-500 transition-colors duration-200 relative group"
                href={link.link}
              >
                {link.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Button section */}
      <div className="hidden md:block">
        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 shadow-sm hover:shadow-md">
          Download App
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          className="p-2 text-gray-700 hover:text-orange-500 transition-colors focus:outline-none"
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
        <div className="absolute top-full left-0 right-0 bg-white p-5 shadow-lg md:hidden border-t border-gray-100 animate-fade-in">
          <ul className="flex flex-col gap-4">
            {NavbarLinks.map((link) => (
              <li key={link.id} className="border-b border-gray-100 pb-2">
                <a
                  className="block text-gray-800 hover:text-orange-500 transition-colors text-lg font-medium"
                  href={link.link}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button className="w-full bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg text-white font-medium text-center transition-all duration-300">
                Download App
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
