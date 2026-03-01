import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import axiosInstance from "../Axios/axiosInstance";

const AlumniDashboard = () => {
  const [alumniMeets, setAlumniMeets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredMeets, setRegisteredMeets] = useState([]);
  const [alumni, setAlumni] = useState(null);
  const [participants, setParticipants] = useState({}); // ✅ meetId -> list of alumni

  // ✅ Check login and load alumni info
  useEffect(() => {
    const token = localStorage.getItem("alumniToken");
    const alumniData = localStorage.getItem("alumniData");

    if (!token) {
      window.location.href = "/";
    } else if (alumniData) {
      setAlumni(JSON.parse(alumniData));
    }
  }, []);

  // ✅ Fetch all Alumni Meets
  useEffect(() => {
    const fetchAlumniMeets = async () => {
      try {
        const res = await axiosInstance.get("alumni-meet");
        setAlumniMeets(res.data);
      } catch (err) {
        console.error("Error fetching alumni meets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumniMeets();
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("alumniToken");
    localStorage.removeItem("alumniData");
    window.location.href = "/";
  };

  // ✅ Register for a meet
  const handleRegister = async (meetId) => {
    try {
      const alumniId = alumni?.id;
      if (!alumniId) {
        alert("Alumni ID not found. Please log in again.");
        return;
      }

      const res = await axiosInstance.post(
        `alumni-meet/register?alumniId=${alumniId}&meetId=${meetId}`
      );
      alert(res.data);
      setRegisteredMeets((prev) => [...prev, meetId]);
    } catch (err) {
      console.error("Error registering for meet:", err);
      alert("Registration failed. Try again.");
    }
  };

  // ✅ Fetch participants for a specific meet
  const handleViewParticipants = async (meetId) => {
    try {
      const res = await axiosInstance.get(`alumni-meet/${meetId}/participants`);
      setParticipants((prev) => ({
        ...prev,
        [meetId]: res.data,
      }));
    } catch (err) {
      console.error("Error fetching participants:", err);
      alert("Failed to fetch participants.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold text-indigo-600">
            Alumni Panel
          </div>

          {/* Alumni Info */}
          {alumni && (
            <div className="px-6 text-gray-700 mb-6">
              <p className="font-semibold">{alumni.name}</p>
              <p className="text-sm">{alumni.email}</p>
              <p className="text-sm text-gray-500">
                Batch: {alumni.yearOfGraduation}
              </p>
            </div>
          )}

          {/* Sidebar Links */}
          <nav className="flex flex-col space-y-3 px-6">
            {/* <button
              onClick={() => (window.location.href = "/alumni-dashboard")}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              <FaCalendarAlt /> Alumni Meets
            </button> */}

            {/* ✅ Mentorship Page Link */}
            <button
              onClick={() => (window.location.href = "/alumni/mentorship")}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              <FaChalkboardTeacher /> Mentorship
            </button>
            <button
              onClick={() => (window.location.href = "/alumni/Offers")}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              <FaChalkboardTeacher /> Job Offers
            </button>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-center font-bold text-white bg-red-500 rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
          Alumni Meets
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniMeets.length > 0 ? (
              alumniMeets.map((meet) => (
                <div
                  key={meet.id}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-indigo-500"
                >
                  {/* Image */}
                  {meet.imageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${meet.imageBase64}`}
                      alt={meet.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                      No Image
                    </div>
                  )}

                  {/* Meet Info */}
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {meet.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{meet.description}</p>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                    <FaCalendarAlt />{" "}
                    {meet.date
                      ? new Date(meet.date).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2">
                    {registeredMeets.includes(meet.id) ? (
                      <button
                        disabled
                        className="w-full py-2 text-sm font-bold text-green-600 border border-green-500 rounded-xl cursor-not-allowed"
                      >
                        ✅ Registered
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(meet.id)}
                        className="w-full py-2 text-sm font-bold text-white bg-indigo-500 rounded-xl hover:bg-indigo-600 transition-all duration-300"
                      >
                        Register
                      </button>
                    )}

                    <button
                      onClick={() => handleViewParticipants(meet.id)}
                      className="w-full py-2 text-sm font-bold text-indigo-600 border border-indigo-500 rounded-xl hover:bg-indigo-50 transition-all duration-300 flex justify-center items-center gap-2"
                    >
                      <FaUsers /> View Participants
                    </button>
                  </div>

                  {/* Participants List */}
                  {participants[meet.id] && (
                    <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Registered Alumni:
                      </h4>
                      {participants[meet.id].length > 0 ? (
                        <ul className="space-y-1 text-sm text-gray-600">
                          {participants[meet.id].map((a) => (
                            <li key={a.id}>
                              👤 {a.name} ({a.email})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 text-sm">
                          No alumni registered yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                No alumni meets available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDashboard;
