// src/components/AdminPlacements.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './AdminSidebar';
import axiosInstance from '../Axios/axiosInstance';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaTimes, FaBuilding, FaFileAlt } from 'react-icons/fa'; // Removed FaDollarSign, FaCalendarAlt

const AdminPlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    // Removed packageDetails, date, requirements
    imageBase64: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  // Redirect if adminToken does not exist
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) window.location.href = '/';
  }, []);

  // Fetch placements
  const fetchPlacements = async () => {
    setLoading(true);
    try {
      // NOTE: The backend may still return full objects, but we only use company and role in the UI.
      const res = await axiosInstance.get('/placement');
      setPlacements(res.data);
    } catch (err) {
      console.error('Error fetching placements:', err);
      setMessage('Failed to fetch placements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  // Form handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image to Base64
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Create payload containing only the fields we want to submit
    const submissionData = {
        company: formData.company,
        role: formData.role,
        imageBase64: formData.imageBase64,
        // Since the backend might require these fields, we send empty strings if they are missing
        packageDetails: "",
        date: "",
        requirements: ""
    };

    try {
      if (editId) {
        // Send simplified data for update
        await axiosInstance.put(`/placement/${editId}`, submissionData);
        setMessage('Placement updated successfully! 🎉');
      } else {
        // Send simplified data for creation
        await axiosInstance.post('/placement', submissionData);
        setMessage('Placement added successfully! ✅');
      }
      
      // Reset form to only the displayed fields
      setFormData({
        company: '',
        role: '',
        imageBase64: ''
      });
      setEditId(null);
      fetchPlacements();
    } catch (err) {
      console.error(err);
      setMessage('Failed to save placement. Please check the data.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = placement => {
    setEditId(placement.id);
    // Populate form with only company, role, and image
    setFormData({
      company: placement.company,
      role: placement.role,
      imageBase64: placement.imageBase64 || ''
      // Note: Other fields (packageDetails, date, requirements) are omitted from the state
    });
    // Scroll to the top of the content area, not just the window
    document.querySelector('.admin-content').scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
        company: '',
        role: '',
        imageBase64: ''
    });
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this placement? This cannot be undone.')) {
      try {
        await axiosInstance.delete(`/placement/${id}`);
        setMessage('Placement deleted successfully! 🗑️');
        fetchPlacements();
      } catch (err) {
        console.error(err);
        setMessage('Failed to delete placement.');
      }
    }
  };

  // Fetch placement applicants
  const handleViewApplicants = async (placement) => {
    try {
      setSelectedPlacement(placement);
      setApplicants([]); // Clear previous data
      const res = await axiosInstance.get(`/placement/${placement.id}/applicants`);
      setApplicants(res.data);
      setShowApplicantsModal(true);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      alert('Failed to fetch applicants for this placement.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50 overflow-y-auto admin-content">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-800 border-b-4 border-indigo-400 pb-2">
          💼 Placement Management Dashboard
        </h1>

        {/* Add/Edit Placement Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-indigo-100">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${editId ? 'text-blue-600' : 'text-indigo-600'}`}>
            {editId ? <FaEdit className="text-xl"/> : <FaPlus className="text-xl"/>}
            {editId ? 'Edit Placement Details' : 'Post New Placement Opportunity'}
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  required
                />
              </div>
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="role"
                  placeholder="Job Role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  required
                />
              </div>
              {/* Removed Package input */}
              {/* Removed Date input */}
            </div>

            {/* Removed Requirements textarea */}

            {/* 🖼️ Image Upload */}
            <div className="border-t pt-4">
                <label className="block text-gray-700 font-medium mb-2">Company Logo/Banner (Optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            
            {/* Image Preview */}
            {formData.imageBase64 && (
              <img
                src={formData.imageBase64}
                alt="Preview"
                className="w-40 h-40 object-contain p-2 border border-gray-200 rounded-xl mt-3 shadow-md"
              />
            )}

            {message && (
              <p
                className={`text-center font-semibold p-3 rounded-xl ${
                  message.includes('success') || message.includes('🎉') || message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex gap-4">
                <button
                type="submit"
                disabled={loading}
                className={`flex-1 p-3 rounded-xl text-white font-bold transition-all duration-300 transform hover:scale-[1.01] ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                {loading
                    ? editId
                        ? 'Saving Changes...'
                        : 'Posting...'
                    : editId
                        ? 'Save Changes'
                        : 'Post Placement'}
                </button>
                {editId && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="p-3 rounded-xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all duration-300"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
          </form>
        </div>

        {/* Placements Cards */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Current Placement Listings ({placements.length})
          </h2>
          {loading ? (
             <p className="text-center text-indigo-500 text-lg">Loading listings...</p>
          ) : placements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placements.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-xl p-5 border-t-4 border-indigo-500 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Show image/logo if available */}
                    <div className="w-full h-32 mb-3 bg-gray-100 flex justify-center items-center rounded-lg overflow-hidden">
                        {p.imageBase64 ? (
                            <img
                                src={p.imageBase64}
                                alt={p.company}
                                className="w-full h-full object-contain p-2"
                            />
                        ) : (
                            <FaBuilding className="text-indigo-400 text-4xl"/>
                        )}
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-indigo-700 mb-1">{p.company}</h3>
                    <p className="text-lg font-semibold text-gray-800 mb-2">{p.role}</p>
                    
                    {/* Removed Package display */}
                    {/* Removed Date display */}
                    {/* Removed Requirements display */}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewApplicants(p)}
                      className="p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
                    >
                      <FaUsers /> Applicants
                    </button>
                    <div className="flex gap-2">
                        <button
                        onClick={() => handleEdit(p)}
                        className="flex-1 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                        >
                        <FaEdit /> Edit
                        </button>
                        <button
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                        >
                        <FaTrash /> Delete
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">
                No placement opportunities have been posted yet. Use the form above to get started.
            </p>
          )}
        </div>
      </div>

      {/* ✅ Applicants Modal */}
      {showApplicantsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-[95%] md:w-[70%] lg:w-[50%] shadow-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-2xl font-extrabold text-indigo-700">
                Applicants for {selectedPlacement?.company}
                </h2>
                <button 
                    onClick={() => setShowApplicantsModal(false)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <FaTimes className="text-2xl"/>
                </button>
            </div>

            <div className="overflow-y-auto flex-1">
                {applicants.length > 0 ? (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="sticky top-0 bg-indigo-50 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 border-b border-indigo-200">Name</th>
                            <th className="py-3 px-6 border-b border-indigo-200">Email</th>
                            <th className="py-3 px-6 border-b border-indigo-200">Batch</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {applicants.map((user, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-6 whitespace-nowrap font-medium">{user.name}</td>
                            <td className="py-3 px-6">{user.email}</td>
                            <td className="py-3 px-6">{user.batch || 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                ) : (
                <div className='p-8 text-center bg-gray-50 rounded-xl'>
                    <p className="text-gray-500 text-lg">
                        <FaUsers className='inline mr-2 text-xl text-indigo-400'/>
                        No students have applied for this placement yet.
                    </p>
                </div>
                )}
            </div>

            <div className="text-center mt-6 pt-4 border-t">
              <button
                onClick={() => setShowApplicantsModal(false)}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlacements;