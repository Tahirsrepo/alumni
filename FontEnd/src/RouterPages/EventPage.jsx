// src/pages/EventPage.jsx (Revised)

import React from 'react';
// Assuming you have a reusable component named 'Navbar'
// import Navbar from '../components/Navbar'; 
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import ATMENavbar from '../Router/ATMENavbar';

const EventPage = () => {
    // Mock event data for display
    const event = {
        title: "Future of Tech: AI & Blockchain Synergy",
        date: "Saturday, November 30, 2025",
        time: "10:00 AM - 1:00 PM IST",
        location: "Auditorium Hall 1, ATME Campus / Online via Zoom",
        speaker: "Dr. Anjali Sharma, Chief Innovation Officer, Nexus Corp.",
        description: "Join us for an exclusive professional development event exploring the convergence of Artificial Intelligence and Blockchain technologies. Learn how these powerful tools are reshaping industries and creating new career pathways for our alumni. This event provides valuable insights for both technical and non-technical backgrounds."
    };
    
    // Placeholder function for registration link/logic
    const handleRegisterClick = () => {
        alert("Registration is currently disabled in this component. Navigate to the actual registration URL.");
    };

    return (
        <div className="min-h-screen bg-[#0A0E2B] text-white font-sans">
            
            {/* 1. Navbar Placeholder */}
            {/* Assuming a <Navbar /> component is used here that matches the screenshot's design */}
            <div className="">
                <ATMENavbar/>
            </div>
            {/* ---------------------------------------------------- */}
            
            <main className="max-w-6xl mx-auto py-16 px-4">
                
                {/* --- Event Hero Section --- */}
                <section className="text-center mb-12">
                    <p className="text-lg font-medium text-indigo-400 mb-3 uppercase tracking-widest">
                        Upcoming Professional Event
                    </p>
                    <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                            {event.title.split(':')[0]}:
                        </span>
                        <br className="hidden sm:inline"/> {event.title.split(':')[1]}
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        A focused deep-dive session with **{event.speaker}** designed exclusively for ATME alumni and current students.
                    </p>
                </section>
                
                {/* --- Event Details Card --- */}
                <div className="bg-[#1C2140] p-8 md:p-12 rounded-2xl shadow-2xl border border-indigo-800/50">
                    <h3 className="text-3xl font-bold mb-8 text-indigo-400 border-b border-indigo-700 pb-3">
                        Key Details & Agenda
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
                        
                        {/* Left Column (Key Info) */}
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <FaCalendarAlt className="text-purple-500 text-2xl mt-1 mr-4 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-300">Date</p>
                                    <p className="text-white font-bold">{event.date}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FaClock className="text-purple-500 text-2xl mt-1 mr-4 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-300">Time</p>
                                    <p className="text-white font-bold">{event.time}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-purple-500 text-2xl mt-1 mr-4 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-300">Location</p>
                                    <p className="text-white font-bold">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Description) */}
                        <div className="space-y-6 border-l md:border-l-2 border-indigo-700/50 md:pl-8 pt-4 md:pt-0">
                            <h4 className="text-xl font-bold text-gray-200">About the Session:</h4>
                            <p className="text-gray-300 leading-relaxed">
                                {event.description}
                            </p>
                            <p className="text-gray-400 italic">
                                Speaker: **{event.speaker}**
                            </p>
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    );
};

export default EventPage;