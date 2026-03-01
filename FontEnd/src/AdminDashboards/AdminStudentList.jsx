// src/components/AdminStudentList.jsx
import React, { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import axiosInstance from '../Axios/axiosInstance';
import Sidebar from '../AdminDashboards/AdminSidebar';

const AdminStudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [batchYear, setBatchYear] = useState('');

  // Redirect if adminToken does not exist
  useEffect(() => {
    if (!localStorage.getItem('adminToken')) window.location.href = '/';
  }, []);

  // Fetch all students
  const fetchAllStudents = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('user/all'); // ✅ updated endpoint
      setStudentList(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search students
  const handleSearch = async () => {
    if (!searchKeyword) return fetchAllStudents();
    setLoading(true);
    try {
      const res = await axiosInstance.get(`user/search?keyword=${searchKeyword}`);
      setStudentList(res.data);
    } catch (err) {
      console.error('Error searching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter by passout year
  const handleBatchFilter = async () => {
    if (!batchYear) return fetchAllStudents();
    setLoading(true);
    try {
      const res = await axiosInstance.get(`user/year/${batchYear}`);
      setStudentList(res.data);
    } catch (err) {
      console.error('Error filtering by year:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center gap-2">
            <FaUsers className="text-indigo-500" /> Student List
          </h1>
        </div>

        {/* Search & Filter */}
        {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or USN..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
            placeholder="Filter by passout year (e.g., 2025)"
            value={batchYear}
            onChange={(e) => setBatchYear(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
          />
          <button
            onClick={handleBatchFilter}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300"
          >
            Filter
          </button>
        </div> */}

        {/* Student List */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentList.length > 0 ? (
              studentList.map((student) => (
                <div
                  key={student.usn}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-indigo-500"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{student.name}</h3>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">USN:</span> {student.usn || 'N/A'}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Email:</span> {student.email}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Branch:</span> {student.branch || 'N/A'}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Passout Year:</span> {student.passoutYear || 'N/A'}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Role:</span> {student.role || 'Student'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No students found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudentList;
