import React, { useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';
import { LogIn, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axiosInstance.post('admin/login', formData);
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }

      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/admin/dashboard'; // redirect after login
      }, 1500);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Invalid credentials. Please try again.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-indigo-100 dark:border-gray-700">
        <div className="text-center">
          <LogIn className="w-10 h-10 mx-auto text-indigo-600 mb-2" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access the admin dashboard to manage the system.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
          </div>

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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center">
          <a
            href="/login/admin"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Don’t have an admin account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
