// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './AdminSidebar';
import { FaUsers, FaCalendarAlt, FaBriefcase, FaUserPlus, FaGraduationCap, FaBuilding } from 'react-icons/fa';
import axiosInstance from '../Axios/axiosInstance';

const AdminDashboard = () => {
  const [alumniMeets, setAlumniMeets] = useState([]);
  const [events, setEvents] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [pendingRegistrations, setPendingRegistrations] = useState(0); // if you have an endpoint for this

  // Redirect if adminToken does not exist
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) window.location.href = '/';
  }, []);

  // Fetch Alumni Meets
  useEffect(() => {
    const fetchAlumniMeets = async () => {
      try {
        const res = await axiosInstance.get('/alumni-meet');
        const formattedMeets = res.data.map(meet => ({
          id: meet.id,
          title: meet.title || '',
          description: meet.description || '',
          date: meet.date || '',
          imageBase64: meet.imageBase64 || meet.image_base64 || ''
        }));
        setAlumniMeets(formattedMeets);
      } catch (err) {
        console.error('Error fetching alumni meets:', err);
      }
    };
    fetchAlumniMeets();
  }, []);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get('/events/all');
        const formattedEvents = res.data.map(event => ({
          id: event.id,
          title: event.title || '',
          description: event.description || '',
          date: event.date || '',
          imageBase64: event.imageBase64 || event.image_base64 || ''
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  // Fetch Placements
  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const res = await axiosInstance.get('/placement');
        const formattedPlacements = res.data.map(p => ({
          id: p.id,
          studentName: p.studentName || p.student_name || '',
          company: p.company || '',
          role: p.role || '',
          date: p.date || ''
        }));
        setPlacements(formattedPlacements);
      } catch (err) {
        console.error('Error fetching placements:', err);
      }
    };
    fetchPlacements();
  }, []);

  // Stats calculated dynamically
  const stats = [
    { title: 'Total Alumni Meets', value: alumniMeets.length, icon: <FaGraduationCap />, color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
    { title: 'Active Events', value: events.length, icon: <FaCalendarAlt />, color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { title: 'New Placements', value: placements.length, icon: <FaBriefcase />, color: 'bg-gradient-to-r from-yellow-400 to-yellow-500' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center justify-between p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div>
                <p className="text-gray-400 font-semibold">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-full text-white text-3xl shadow-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Alumni Meets */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
            Upcoming Alumni Meets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniMeets.length > 0 ? alumniMeets.map(meet => (
              <div key={meet.id} className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                {meet.imageBase64 ? (
                  <img src={`data:image/jpeg;base64,${meet.imageBase64}`} alt={meet.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{meet.title}</h3>
                  <p className="text-gray-600 mb-2">{meet.description}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-indigo-500 rounded-full">
                    {meet.date ? new Date(meet.date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            )) : <p className="text-gray-500 col-span-full">No alumni meets available.</p>}
          </div>
        </div>

        {/* All Events */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? events.map(event => (
              <div key={event.id} className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                {event.imageBase64 ? (
                  <img src={`data:image/jpeg;base64,${event.imageBase64}`} alt={event.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-purple-500 rounded-full">
                    {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            )) : <p className="text-gray-500 col-span-full">No events available.</p>}
          </div>
        </div>

        {/* Placements Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
            Recent Placements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placements.length > 0 ? placements.map(p => (
              <div key={p.id} className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md p-5 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaBuilding className="text-indigo-500"/> {p.company}
                </h3>
                <p className="text-gray-600 mb-1 font-medium">Student: {p.studentName}</p>
                <p className="text-gray-600 mb-1 font-medium">Role: {p.role}</p>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                  {p.date ? new Date(p.date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            )) : <p className="text-gray-500 col-span-full">No placements available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
