import React, { useState } from "react";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";

const ATMENavbar = () => {
  // State for mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for the Sign Up dropdown open/close
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  // NEW: State for the Login dropdown open/close
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Events", href: "/events" },
    // { name: "Career Hub", href: "/jobs" },
    // { name: "Directory", href: "/alumni" },
  ];

  const loginOptions = [
    { name: "Student Login", href: "/login/Student" },
    { name: "Admin Login", href: "/login/admin" },
    { name: "Alumni Login", href: "/login/alumni" },
  ];

  const signupOptions = [
    { name: "Student Sign Up", href: "/signup/student" },
    { name: "Admin Sign Up", href: "/signup/admin" },
    { name: "Alumni Sign Up", href: "/signup/Alumni" },
  ];

  // Helper function to close all dropdowns when menu is opened/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSignupDropdownOpen(false);
    setIsLoginDropdownOpen(false);
  };

  // Helper function to close other dropdowns when one is opened
  const handleDropdownToggle = (dropdownSetter, currentState) => {
    // Close all others
    setIsSignupDropdownOpen(false);
    setIsLoginDropdownOpen(false);
    // Open/Close the target one
    dropdownSetter(!currentState);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            {/* Logo Image */}
            <img
              src="/Img/logo.png" // 🔹 Change this to your actual logo path
              alt="ATME Logo"
              className="w-10 h-10 rounded-md object-contain"
            />

            {/* Logo Text */}
            <div className="flex items-center flex-col leading-tight">
              <span className="text-2xl font-extrabold text-gray-700 dark:text-gray-300 tracking-wide">
                ATME
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Engineering College
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links & CTAs */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.name}
                </a>
              ))}

              {/* 1. Login Dropdown Button (New Implementation) */}
              <div className="relative">
                <button
                  onClick={() =>
                    handleDropdownToggle(
                      setIsLoginDropdownOpen,
                      isLoginDropdownOpen
                    )
                  }
                  className="group inline-flex items-center justify-center rounded-md border border-indigo-200 dark:border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm transition-all duration-150 hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Log In
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                      isLoginDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Login Dropdown Panel */}
                {isLoginDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsLoginDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div className="py-1">
                      {loginOptions.map((option) => (
                        <a
                          key={option.name}
                          href={option.href}
                          onClick={() => setIsLoginDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          {option.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Sign Up Dropdown Button (Existing) */}
              <div className="relative">
                <button
                  onClick={() =>
                    handleDropdownToggle(
                      setIsSignupDropdownOpen,
                      isSignupDropdownOpen
                    )
                  }
                  className="group inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                      isSignupDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* Sign Up Dropdown Panel */}
                {isSignupDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsSignupDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div className="py-1">
                      {signupOptions.map((option) => (
                        <a
                          key={option.name}
                          href={option.href}
                          onClick={() => setIsSignupDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          {option.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={toggleMenu}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Login Options */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                <LogIn className="w-4 h-4 mr-2" /> Log In As:
              </p>
              {loginOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.href}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={toggleMenu}
                >
                  {option.name}
                </a>
              ))}
            </div>

            {/* Mobile Sign Up Options */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white">
                Sign Up As:
              </p>
              {signupOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.href}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={toggleMenu}
                >
                  {option.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ATMENavbar;
