import React, { useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlumniSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    yearOfGraduation: '',
    branch: '',
    email: '',
    phone: '',
    password: '',
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axiosInstance.post('alumni/register', formData);
      console.log(response.data);
      setMessage('🎉 Registration successful! Please proceed to login.');
      setFormData({
        name: '',
        usn: '',
        yearOfGraduation: '',
        branch: '',
        email: '',
        phone: '',
        password: '',
      });
       setTimeout(() => {
        Navigation('/login/alumni')
      }, 1500);
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-indigo-100 dark:border-gray-700">
        <div className="text-center">
          <UserPlus className="w-10 h-10 mx-auto text-indigo-600 mb-2" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            ATME Alumni Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join your alumni network and stay connected.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.name}
            onChange={handleChange}
          />

          {/* USN */}
          <input
            type="text"
            name="usn"
            placeholder="University Seat Number (USN)"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.usn}
            onChange={handleChange}
          />

          {/* Year of Graduation */}
          <input
            type="text"
            name="yearOfGraduation"
            placeholder="Year of Graduation (e.g., 2025)"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.yearOfGraduation}
            onChange={handleChange}
          />

          {/* Branch */}
          <input
            type="text"
            name="branch"
            placeholder="Branch (e.g., CSE, ECE, ME)"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.branch}
            onChange={handleChange}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-3 py-3 border rounded-md text-sm bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.password}
            onChange={handleChange}
          />

          {message && (
            <p
              className={`text-center font-medium ${
                message.includes('successful')
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 disabled:opacity-50"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <ArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
            </span>
            {loading ? 'Registering...' : 'Register Account'}
          </button>
        </form>

        <div className="text-center">
          <a
            href="/login/Alumni"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Already have an account? Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlumniSignUp;
