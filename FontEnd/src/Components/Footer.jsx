import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  // Define navigation links and resources
  const navigation = {
    // Core pages created in this conversation
    main: [
      { name: 'Home', href: '/' }, 
      { name: 'About Us', href: '/about-us' },
      { name: 'Events Schedule', href: '/events' },
      { name: 'Career Hub', href: '/jobs' },
    ],
    // Functionality pages (from previous designs)
    platform: [
      { name: 'Alumni Directory', href: '/alumni' },
      { name: 'Mentorship Program', href: '/mentorship' },
      { name: 'Post a Job', href: '/post-job' },
      { name: 'Start a Chapter', href: '/chapters' },
    ],
    // Institutional and Legal Links
    support: [
      { name: 'ATME Official Site', href: 'https://atme.edu' }, // Placeholder URL
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'FAQs', href: '/faq' },
    ],
  };

  return (
    <footer className="bg-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Column 1: Logo & Mission Statement/Contact */}
          <div className="space-y-6 xl:col-span-1">
            <a href="/" className="text-3xl font-extrabold tracking-wider text-indigo-400">
              ATME<span className="text-white ml-1 font-semibold">Alumni</span>
            </a>
            <p className="text-gray-400 text-base max-w-md">
              Connecting the global ATME community for networking, career growth, and lifelong engagement.
            </p>
            
            {/* Contact Information */}
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-indigo-400" />
                <a href="mailto:support@atmealumni.com" className="hover:text-white transition-colors">
                  support@atmealumni.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mt-1 mr-2 text-indigo-400 flex-shrink-0" />
                <span>
                  Alumni Relations Office,<br/> ATME Institute, City, State, India
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Navigation Links Grid (3 columns inside the two spans) */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-3 md:gap-8 col-span-2">
              
              {/* Group 1: Main Pages (Corrected Links) */}
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Group 2: Platform Features */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Platform Features</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.platform.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Group 3: Institution & Support */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Institution & Support</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* --- */}

        {/* Separator and Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} ATME Alumni Management System. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-6 order-1 md:order-2">
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;