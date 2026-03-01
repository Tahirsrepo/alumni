import React, { useState } from 'react';
import axiosInstance from '../Axios/axiosInstance'; // Adjust path as needed
import { Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const Navigator = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(''); // Clear message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Endpoint specified for Admin registration
      const response = await axiosInstance.post('/admin/signup', formData); 
      console.log(response)
      setMessage('Admin account successfully created! You can now log in.');
      setFormData({ name: '', email: '', password: '' }); // Clear form
      setTimeout(() => {
        // Redirect after login
        Navigator('/login/admin'); // Change as needed
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Admin registration failed. Check if email is already in use.';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-4 border-red-600 dark:border-red-500">
        <div className='text-center'>
          <Shield className="w-10 h-10 mx-auto text-red-600 mb-2" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            System Administrator Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-semibold text-red-500">
            Restricted Access. For ATME Staff Use Only.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Staff Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Official Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Secure Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {message && (
            <p className={`text-center font-medium ${message.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {message}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-150 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className="h-5 w-5 text-red-400 group-hover:text-red-300 transition-colors" />
              </span>
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </div>
        </form>

        <div className="text-center">
            <a href="/login/admin" className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                Already have an admin account? Log In
            </a>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;