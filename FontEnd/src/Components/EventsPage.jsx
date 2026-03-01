import React, { useState } from 'react';
import { MapPin, Clock, CalendarDays, Filter, ChevronRight } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: "Annual Global Alumni Meet 2026",
    date: "Saturday, March 15, 2026",
    time: "7:00 PM IST",
    location: "Grand Hyatt, Bengaluru",
    type: "Reunion",
    status: "Upcoming",
    description: "The biggest networking event of the year. Connect with graduates from all batches and disciplines.",
    isRegistered: false,
  },
  {
    id: 2,
    title: "Industry 4.0 Tech Workshop",
    date: "Friday, November 29, 2025",
    time: "10:00 AM PST",
    location: "Virtual (Zoom)",
    type: "Workshop",
    status: "Upcoming",
    description: "A focused session on AI and automation trends, led by ATME Silicon Valley alumni.",
    isRegistered: true,
  },
  {
    id: 3,
    title: "Campus Placement Drive Kickoff",
    date: "Tuesday, October 28, 2025",
    time: "9:00 AM IST",
    location: "ATME Auditorium",
    type: "Placement",
    status: "Upcoming",
    description: "Opening session for final-year students and participating companies. Mandatory attendance.",
    isRegistered: false,
  },
  {
    id: 4,
    title: "Batch of '95 Silver Jubilee",
    date: "December 10, 2024",
    time: "Past",
    location: "ATME Campus",
    type: "Reunion",
    status: "Past",
    description: "A wonderful celebration marking 25 years since graduation.",
    isRegistered: true,
  },
];

const EventsPage = () => {
  const [filterType, setFilterType] = useState('All');

  const filteredEvents = eventsData.filter(event => {
    if (filterType === 'All') return true;
    return event.type === filterType;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <CalendarDays className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
            Upcoming ATME Events
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            From professional workshops to milestone reunions, stay connected to your alma mater and peers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 sm:mb-0">
            <Filter className="w-5 h-5 text-indigo-600" />
            <span>Filter by Event Type:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', 'Reunion', 'Workshop', 'Placement'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                  filterType === type
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-indigo-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                event.status === 'Upcoming' 
                  ? 'bg-white dark:bg-gray-800 hover:shadow-xl' 
                  : 'bg-gray-200/50 dark:bg-gray-800/50 opacity-80 cursor-not-allowed'
              } border-t-4 border-indigo-600`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  event.type === 'Placement' ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                }`}>
                  {event.type}
                </span>
                {event.isRegistered && event.status === 'Upcoming' && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Registered
                  </span>
                )}
                {event.status === 'Past' && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-700">
                    Event Ended
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
              
              <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <CalendarDays className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                  <span>{event.location}</span>
                </div>
              </div>

              {event.status === 'Upcoming' && (
                <div className="mt-5">
                  <a
                    href={`/events/${event.id}`}
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    {event.isRegistered ? 'View Details' : 'Register Now'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Call to Action for Admins */}
        <div className="mt-16 text-center p-8 bg-indigo-50 dark:bg-gray-800 rounded-xl border border-indigo-100 dark:border-gray-700">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Organizing an Event?</h4>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Post your official chapter event or campus reunion for maximum visibility among the ATME community.
            </p>
            <a
                href="/events"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-indigo-700"
            >
                Post a New Event
            </a>
        </div>
        
      </div>
    </div>
  );
};

export default EventsPage;