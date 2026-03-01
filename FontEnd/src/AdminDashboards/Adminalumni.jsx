// src/components/Adminalumni.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './AdminSidebar';
import axiosInstance from '../Axios/axiosInstance';
import { FaPlus, FaCalendarAlt, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const Adminalumni = () => {
  const [alumniMeets, setAlumniMeets] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', imageBase64: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if adminToken does not exist
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) window.location.href = '/';
  }, []);

  // Fetch all Alumni Meets
  const fetchAlumniMeets = async () => {
    try {
      const res = await axiosInstance.get('alumni-meet');
      setAlumniMeets(res.data);
    } catch (err) {
      console.error('Error fetching alumni meets:', err);
      setMessage('Failed to fetch Alumni Meets. Check backend/CORS.');
    }
  };

  useEffect(() => {
    fetchAlumniMeets();
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
        // Update existing alumni meet
        await axiosInstance.put(`alumni-meet/${editingId}`, formData);
        setMessage('Alumni Meet updated successfully!');
      } else {
        // Create new alumni meet
        await axiosInstance.post('alumni-meet', formData);
        setMessage('Alumni Meet added successfully!');
      }
      setFormData({ title: '', description: '', date: '', imageBase64: '' });
      setEditingId(null);
      fetchAlumniMeets();
    } catch (err) {
      console.error(err);
      setMessage('Failed to save Alumni Meet.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = meet => {
    setEditingId(meet.id);
    setFormData({
      title: meet.title,
      description: meet.description,
      date: meet.date,
      imageBase64: meet.imageBase64 || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this Alumni Meet?')) return;
    try {
      await axiosInstance.delete(`alumni-meet/${id}`);
      setMessage('Alumni Meet deleted successfully!');
      fetchAlumniMeets();
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete Alumni Meet.');
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
          Alumni Meets
        </h1>

        {/* Add/Edit Alumni Meet Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            {editingId ? <FaEdit /> : <FaPlus />} {editingId ? 'Edit Alumni Meet' : 'Add New Alumni Meet'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500" required />
            <input type="date" name="date" value={formData.date} onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500" required />
            <input type="file" accept="image/*" onChange={handleImageChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
            {message && (
              <p className={`text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <div className="flex gap-3">
              <button type="submit" disabled={loading}
                className="flex-1 p-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all duration-300">
                {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Alumni Meet' : 'Add Alumni Meet')}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit}
                  className="flex-1 p-3 rounded-xl bg-gray-400 text-white font-bold hover:bg-gray-500 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Alumni Meets Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumniMeets.length > 0 ? alumniMeets.map(meet => (
            <div key={meet.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              {meet.imageBase64 ? (
                <img src={`data:image/jpeg;base64,${meet.imageBase64}`} alt={meet.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-between">
                  {meet.title}
                  <span className="flex gap-2">
                    <button onClick={() => handleEdit(meet)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                    <button onClick={() => handleDelete(meet.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                  </span>
                </h3>
                <p className="text-gray-600 mb-2">{meet.description}</p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <FaCalendarAlt /> {new Date(meet.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )) : <p className="text-gray-500 col-span-full">No Alumni Meets available.</p>}
        </div>
      </div>
    </div>
  );
};

export default Adminalumni;
