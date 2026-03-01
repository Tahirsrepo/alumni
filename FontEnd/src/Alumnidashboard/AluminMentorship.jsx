import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import axios from "axios"; // Included in case it's needed elsewhere

const AluminMentorship = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMentorship, setNewMentorship] = useState({
    title: "",
    description: "",
    skills: "",
  });
  const [registeredUsers, setRegisteredUsers] = useState({});
  const alumniId = 5; // ✅ Replace with dynamic alumni ID from logged-in user later

  // 🧠 Fetch all mentorships
  const fetchMentorships = async () => {
    try {
      const res = await axiosInstance.get("mentorships");
      setMentorships(res.data);
    } catch (err) {
      console.error("Error fetching mentorships:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorships();
  }, []);

  // 🧠 Handle mentorship post creation
  const handleCreateMentorship = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        `mentorships/post?alumniId=${alumniId}`,
        newMentorship
      );
      alert("Mentorship created successfully!");
      setNewMentorship({ title: "", description: "", skills: "" });
      fetchMentorships();
    } catch (err) {
      console.error("Error creating mentorship:", err);
      alert("Failed to create mentorship");
    }
  };

  // 🧠 Fetch registered users for a mentorship
  const handleViewRegistrations = async (mentorshipId) => {
    // Toggle functionality: If registrations are already open, close them
    if (registeredUsers[mentorshipId]) {
      setRegisteredUsers((prev) => {
        const newState = { ...prev };
        delete newState[mentorshipId];
        return newState;
      });
      return;
    }

    try {
      const res = await axiosInstance.get(
        `mentorships/${mentorshipId}/registrations`
      );
      setRegisteredUsers((prev) => ({
        ...prev,
        [mentorshipId]: res.data,
      }));
    } catch (err) {
      console.error("Error fetching registered users:", err);
    }
  };

  // 🧠 Delete mentorship
  const handleDeleteMentorship = async (mentorshipId) => {
    if (!window.confirm("Are you sure you want to delete this mentorship?"))
      return;
    try {
      await axiosInstance.delete(`mentorships/${mentorshipId}`);
      alert("Mentorship deleted successfully");
      fetchMentorships();
    } catch (err) {
      console.error("Error deleting mentorship:", err);
      alert("Failed to delete mentorship");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-xl text-indigo-600 animate-pulse">
        ⏳ Loading mentorships...
      </p>
    );

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-indigo-500 pb-2">
        Alumni Mentorship Hub 💡
      </h1>
      
      {/* 🧾 Create Mentorship Form */}
      <div className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 mb-10 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Post New Mentorship Opportunity
        </h2>
        <form onSubmit={handleCreateMentorship} className="space-y-4">
          <input
            type="text"
            placeholder="Title (e.g., Spring Boot REST API Mentorship)"
            value={newMentorship.title}
            onChange={(e) =>
              setNewMentorship({ ...newMentorship, title: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          />
          <textarea
            placeholder="Detailed Description of the mentorship, schedule, and goals."
            value={newMentorship.description}
            onChange={(e) =>
              setNewMentorship({ ...newMentorship, description: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            rows="4"
            required
          />
          <input
            type="text"
            placeholder="Key Skills (e.g. Java, React, Spring Boot, AWS - separate by comma)"
            value={newMentorship.skills}
            onChange={(e) =>
              setNewMentorship({ ...newMentorship, skills: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.01]"
          >
            🚀 Post Mentorship
          </button>
        </form>
      </div>

      {/* 📋 Display All Mentorships */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Posted Mentorships
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
        {mentorships.length === 0 ? (
          <p className="text-gray-600 col-span-full">
            No mentorships have been posted yet. Start by creating one!
          </p>
        ) : (
          mentorships.map((mentorship) => {
            const isRegisteredOpen = !!registeredUsers[mentorship.id];
            
            // Check if this mentorship was posted by the current alumni (for delete button)
            const isAlumniPost = mentorship.postedByAlumni && mentorship.postedByAlumni.id === alumniId;
            
            return (
              <div
                key={mentorship.id}
                className="bg-white p-6 rounded-3xl shadow-lg border border-indigo-100 hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-700">
                    {mentorship.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Posted on:{" "}
                    <span className="font-medium">
                      {mentorship.postedDate
                        ? new Date(mentorship.postedDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {mentorship.description}
                  </p>
                  <div className="mb-4">
                    <span className="font-semibold text-sm text-gray-600 mr-2">
                      Key Skills:
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                      {mentorship.skills}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleViewRegistrations(mentorship.id)}
                    className={`w-full py-2 px-3 rounded-xl font-semibold transition duration-200 ${
                      isRegisteredOpen
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {isRegisteredOpen ? "Close List" : "View Registrations"}
                  </button>

                  {/* Delete button only for posts by this alumni */}
                  {isAlumniPost && (
                    <button
                      onClick={() => handleDeleteMentorship(mentorship.id)}
                      className="mt-2 w-full bg-gray-200 text-gray-700 py-2 px-3 rounded-xl text-sm hover:bg-gray-300 transition duration-200"
                    >
                      Delete Post
                    </button>
                  )}

                  {/* Display Registered Users */}
                  {isRegisteredOpen && (
                    <div className="mt-4 bg-indigo-50 p-4 rounded-xl border border-indigo-200 max-h-48 overflow-y-auto">
                      <h4 className="font-bold mb-2 text-indigo-800 border-b border-indigo-300 pb-1">
                        Registered Users ({registeredUsers[mentorship.id].length}):
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {registeredUsers[mentorship.id].length === 0 ? (
                          <li className="italic text-gray-500">
                            No users registered yet.
                          </li>
                        ) : (
                          registeredUsers[mentorship.id].map((user) => (
                            <li key={user.id} className="truncate hover:text-indigo-600 transition">
                              <span className="font-medium mr-1">
                                👤 {user.name}
                              </span>
                              — {user.email}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AluminMentorship;