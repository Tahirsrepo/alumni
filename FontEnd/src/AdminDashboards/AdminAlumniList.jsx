import React, { useState, useEffect } from 'react';
import { FaUsers, FaTrash } from 'react-icons/fa';
import axiosInstance from '../Axios/axiosInstance';
import Sidebar from '../AdminDashboards/AdminSidebar';

const AdminAlumniList = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [batchYear, setBatchYear] = useState('');
  const [meets, setMeets] = useState([]);
  const [selectedMeetId, setSelectedMeetId] = useState('');
  const [participants, setParticipants] = useState([]);

  // Redirect if adminToken does not exist
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) window.location.href = '/';
  }, []);

  // Fetch all alumni
  const fetchAllAlumni = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/alumni/all');
      setAlumniList(res.data);
    } catch (err) {
      console.error('Error fetching alumni:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search alumni
  const handleSearch = async () => {
    if (!searchKeyword) return fetchAllAlumni();
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/alumni/search?keyword=${searchKeyword}`);
      setAlumniList(res.data);
    } catch (err) {
      console.error('Error searching alumni:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter by batch
  const handleBatchFilter = async () => {
    if (!batchYear) return fetchAllAlumni();
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/alumni/batch/${batchYear}`);
      setAlumniList(res.data);
    } catch (err) {
      console.error('Error filtering by batch:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch all alumni meets
  const fetchAllMeets = async () => {
    try {
      const res = await axiosInstance.get('/alumni-meet');
      setMeets(res.data);
    } catch (err) {
      console.error('Error fetching meets:', err);
    }
  };

  // ✅ Fetch participants for selected meet
  const handleViewParticipants = async (meetId) => {
    try {
      const res = await axiosInstance.get(`/alumni-meet/${meetId}/participants`);
      setParticipants(res.data);
      setSelectedMeetId(meetId);
    } catch (err) {
      console.error('Error fetching participants:', err);
      alert('Failed to fetch participants.');
    }
  };

  // 🗑 Delete alumni
  const handleDeleteAlumni = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        await axiosInstance.delete(`/alumni/${id}`);
        alert('Alumni deleted successfully!');
        fetchAllAlumni();
      } catch (err) {
        console.error('Error deleting alumni:', err);
        alert('Failed to delete alumni.');
      }
    }
  };

  // 🗑 Delete alumni meet
  const handleDeleteMeet = async (id) => {
    if (window.confirm('Are you sure you want to delete this meet?')) {
      try {
        await axiosInstance.delete(`/alumni-meet/${id}`);
        alert('Alumni Meet deleted successfully!');
        fetchAllMeets();
        if (id === selectedMeetId) {
          setParticipants([]);
          setSelectedMeetId('');
        }
      } catch (err) {
        console.error('Error deleting meet:', err);
        alert('Failed to delete meet.');
      }
    }
  };

  // 🗑 Remove participant from meet
  const handleDeleteParticipant = async (meetId, participantId) => {
    if (window.confirm('Remove this participant from the meet?')) {
      try {
        await axiosInstance.delete(`/alumni-meet/${meetId}/participants/${participantId}`);
        alert('Participant removed!');
        handleViewParticipants(meetId);
      } catch (err) {
        console.error('Error removing participant:', err);
        alert('Failed to remove participant.');
      }
    }
  };

  useEffect(() => {
    fetchAllAlumni();
    fetchAllMeets();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
            Alumni List
          </h1>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email or USN..."
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all duration-300"
          >
            Search
          </button>

          <input
            type="text"
            placeholder="Filter by batch year (e.g., 2025)"
            value={batchYear}
            onChange={e => setBatchYear(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
          />
          <button
            onClick={handleBatchFilter}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
          >
            Filter
          </button>
        </div>

        {/* ✅ Alumni Meets List with Delete */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Alumni Meets</h2>
          {meets.length > 0 ? (
            <ul className="space-y-3">
              {meets.map((meet) => (
                <li
                  key={meet.id}
                  className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border-l-4 border-indigo-500"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{meet.title}</p>
                    <p className="text-sm text-gray-600">{meet.date}</p>
                  </div>
                  {/* <div className="flex gap-3">
                    <button
                      onClick={() => handleViewParticipants(meet.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      View Participants
                    </button>
                    <button
                      onClick={() => handleDeleteMeet(meet.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No alumni meets available.</p>
          )}
        </div>

        {/* ✅ Participants List */}
        {participants.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Registered Participants
            </h2>
            <ul className="space-y-2">
              {participants.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
                >
                  <span className="text-gray-700">
                    {p.name} ({p.email}) - {p.branch}
                  </span>
                  <button
                    onClick={() => handleDeleteParticipant(selectedMeetId, p.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-1"
                  >
                    <FaTrash size={12} /> Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Alumni Cards */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniList.length > 0 ? (
              alumniList.map(alumni => (
                <div
                  key={alumni.usn}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-indigo-500"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{alumni.name}</h3>
                  <p className="text-gray-600 mb-1"><span className="font-medium">USN:</span> {alumni.usn}</p>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Email:</span> {alumni.email}</p>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Phone:</span> {alumni.phone}</p>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Batch Year:</span> {alumni.yearOfGraduation}</p>
                  <p className="text-gray-600 mb-3"><span className="font-medium">Branch:</span> {alumni.branch}</p>

                  {/* 🗑 Delete Button */}
                  <button
                    onClick={() => handleDeleteAlumni(alumni.id)}
                    className="w-full py-2 mt-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No alumni available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAlumniList;
