import React, { useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    usn: '',
    branch: '',
    passoutYear: '',
    role: 'STUDENT', // Default role
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axiosInstance.post('user/signup', formData);
      console.log(response);
      setMessage('Registration successful! Please proceed to login.');
      setFormData({
        name: '',
        email: '',
        password: '',
        usn: '',
        branch: '',
        passoutYear: '',
        role: 'STUDENT',
      });
      setTimeout(() => {
        Navigation('/login/Student');
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-indigo-100 dark:border-gray-700">
        <div className='text-center'>
          <UserPlus className="w-10 h-10 mx-auto text-indigo-600 mb-2" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            Register as ATME Students
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Connect with your network and access career opportunities.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Name */}
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="ATME Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* USN */}
            <div>
              <label htmlFor="usn" className="sr-only">USN</label>
              <input
                id="usn"
                name="usn"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="USN (e.g., 4AD21CS001)"
                value={formData.usn}
                onChange={handleChange}
              />
            </div>

            {/* Branch */}
            <div>
              <label htmlFor="branch" className="sr-only">Branch</label>
              <input
                id="branch"
                name="branch"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Branch (e.g., CSE, ECE, MECH)"
                value={formData.branch}
                onChange={handleChange}
              />
            </div>

            {/* Passout Year */}
            <div>
              <label htmlFor="passoutYear" className="sr-only">Passout Year</label>
              <input
                id="passoutYear"
                name="passoutYear"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Passout Year (e.g., 2025)"
                value={formData.passoutYear}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <p className={`text-center font-medium ${message.includes('successful') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {message}
            </p>
          )}

          {/* Submit */}
          <div>
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
          </div>
        </form>

        <div className="text-center">
          <a href="/login/student" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Already have an account? Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
