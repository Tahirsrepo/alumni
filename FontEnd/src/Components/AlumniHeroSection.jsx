import React from 'react';
import { Network, CalendarDays, Briefcase, ArrowRight } from 'lucide-react';

const FullScopeAlumniHeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Area */}
        <div className="text-center">
          
          {/* Main Heading */}
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl dark:text-white">
            <span className="block">Your Lifetime Hub for</span>
            <span className="block text-indigo-600 mt-2">Alumni, Events & Placements.</span>
          </h1>

          {/* Subheading/Motto */}
          <p className="mt-6 mx-auto max-w-3xl text-xl text-gray-500 dark:text-gray-300">
            Reunite with your batch, register for exclusive professional events, and access the institution's official job board—all in one secure place.
          </p>

          {/* Primary Call-to-Action */}
          <div className="mt-10">
            <a
              href="/login/Student" // Replace with your main Login/Sign-up route
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-1"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Optional: Subtle Decorative Element */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow pointer-events-none"></div>
    </div>
  );
};

export default FullScopeAlumniHeroSection;