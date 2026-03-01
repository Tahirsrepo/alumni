// src/components/Adminevents.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './AdminSidebar';
import axiosInstance from '../Axios/axiosInstance';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const Adminevents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', imageBase64: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if adminToken does not exist
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) window.location.href = '/';
  }, []);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get('/events/all');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setMessage('Failed to fetch events. Check backend/CORS.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageBase64: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (editingId) {
        await axiosInstance.put(`/events/${editingId}`, formData);
        setMessage('Event updated successfully!');
      } else {
        await axiosInstance.post('/events/add', formData);
        setMessage('Event added successfully!');
      }
      setFormData({ title: '', description: '', date: '', imageBase64: '' });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      setMessage('Failed to save event.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = event => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      imageBase64: event.imageBase64 || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axiosInstance.delete(`/events/${id}`);
      setMessage('Event deleted successfully!');
      fetchEvents();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete event.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', date: '', imageBase64: '' });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
          Admin Events
        </h1>

        {/* Add/Edit Event Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            {editingId ? <FaEdit /> : <FaPlus />} {editingId ? 'Edit Event' : 'Add New Event'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
            {message && (
              <p
                className={`text-center font-medium ${
                  message.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all duration-300"
              >
                {loading ? (editingId ? 'Updating...' : 'Adding...') : editingId ? 'Update Event' : 'Add Event'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 p-3 rounded-xl bg-gray-400 text-white font-bold hover:bg-gray-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Events Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {event.imageBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${event.imageBase64}`}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                    <FaCalendarAlt /> {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adminevents;
