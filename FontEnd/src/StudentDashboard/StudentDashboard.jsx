import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";
import axiosInstance from "../Axios/axiosInstance";

const sidebarItems = [
  { name: "Dashboard", key: "dashboard", icon: <FaUsers /> },
  { name: "Events", key: "events", icon: <FaCalendarAlt /> },
  { name: "Alumni Meets", key: "alumni", icon: <FaGraduationCap /> },
  { name: "Placements", key: "placements", icon: <FaBriefcase /> },
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [events, setEvents] = useState([]);
  const [alumniMeets, setAlumniMeets] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredMeetIds, setRegisteredMeetIds] = useState([]);
  const [appliedPlacementIds, setAppliedPlacementIds] = useState([]); // ✅ Track placement applications

  // Redirect if token does not exist
  useEffect(() => {
    if (!localStorage.getItem("studentToken")) window.location.href = "/";
  }, []);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, alumniRes, placementsRes] = await Promise.all([
          axiosInstance.get("/events/all"),
          axiosInstance.get("/alumni-meet"),
          axiosInstance.get("/placement"),
        ]);
        setEvents(eventsRes.data);
        setAlumniMeets(alumniRes.data);
        setPlacements(placementsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Register for Alumni Meet
  const handleRegisterForMeet = async (meetId) => {
    try {
      const studentDetails = JSON.parse(localStorage.getItem("studentDetails"));
      if (!studentDetails?.id) {
        alert("Student details not found! Please log in again.");
        return;
      }

      const res = await axiosInstance.post(
        `/alumni-meet/register?alumniId=${studentDetails.id}&meetId=${meetId}`
      );

      alert(res.data || "Registered successfully!");
      setRegisteredMeetIds((prev) => [...prev, meetId]);
    } catch (error) {
      console.error("Error registering for meet:", error);
      alert(error.response?.data || "Registration failed.");
    }
  };

  // ✅ Apply for Placement
  const handleApplyPlacement = async (placementId) => {
    try {
      const studentDetails = JSON.parse(localStorage.getItem("studentDetails"));
      if (!studentDetails?.id) {
        alert("Student details not found! Please log in again.");
        return;
      }

      const res = await axiosInstance.post(
        `/placement/apply?userId=${studentDetails.id}&placementId=${placementId}`
      );

      alert(res.data || "Applied successfully!");
      setAppliedPlacementIds((prev) => [...prev, placementId]);
    } catch (error) {
      console.error("Error applying for placement:", error);
      alert(error.response?.data || "Application failed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-6 text-2xl font-bold text-indigo-600">
            Student Panel
          </div>
          <nav className="flex flex-col">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 w-full px-6 py-3 text-left rounded-r-full transition-all duration-300 mb-1 font-medium ${
                  activeTab === item.key
                    ? "bg-indigo-200 font-semibold text-indigo-900 shadow-lg transform scale-105"
                    : "hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-500 hover:text-white hover:shadow-lg hover:scale-105"
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6">
          <button
            onClick={() => {
              localStorage.removeItem("studentToken");
              localStorage.removeItem("studentDetails");
              window.location.href = "/";
            }}
            className="w-full py-3 text-center font-bold text-white bg-red-500 rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
          {sidebarItems.find((item) => item.key === activeTab)?.name}
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            {/* Dashboard Stats */}
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Events", value: events.length },
                  { label: "Alumni Meets", value: alumniMeets.length },
                  { label: "Placements", value: placements.length },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-indigo-500"
                  >
                    <p className="text-gray-400 font-semibold">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-purple-500"
                    >
                      {event.imageBase64 ? (
                        <img
                          src={`data:image/jpeg;base64,${event.imageBase64}`}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                          No Image
                        </div>
                      )}
                      <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                      <p className="text-gray-600 mb-1">{event.description}</p>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <FaCalendarAlt />{" "}
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">
                    No events available.
                  </p>
                )}
              </div>
            )}

            {/* ✅ Alumni Meets */}
            {activeTab === "alumni" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumniMeets.length > 0 ? (
                  alumniMeets.map((meet) => {
                    const isRegistered = registeredMeetIds.includes(meet.id);
                    return (
                      <div
                        key={meet.id}
                        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-green-500"
                      >
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
                        <h3 className="font-bold text-lg mb-1">{meet.title}</h3>
                        <p className="text-gray-600 mb-1">{meet.description}</p>
                        <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
                          <FaCalendarAlt />{" "}
                          {meet.date
                            ? new Date(meet.date).toLocaleDateString()
                            : "N/A"}
                        </p>

                        {isRegistered ? (
                          <button
                            disabled
                            className="w-full py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed font-semibold"
                          >
                            ✅ Registered
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRegisterForMeet(meet.id)}
                            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 font-semibold"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 col-span-full">
                    No alumni meets available.
                  </p>
                )}
              </div>
            )}

            {/* ✅ Placements */}
            {activeTab === "placements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placements.length > 0 ? (
                  placements.map((p) => {
                    const isApplied = appliedPlacementIds.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        className="bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-yellow-500"
                      >
                        {/* ✅ Placement Image */}
                        {p.imageBase64 ? (
                          <img
                            src={`${p.imageBase64}`}
                            alt={p.company}
                            className="w-full h-48 object-cover rounded-md mb-4"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                            No Image
                          </div>
                        )}

                        {/* ✅ Placement Info */}
                        <h3 className="font-bold text-lg mb-1">{p.company}</h3>
                        <p className="text-gray-600 mb-1 font-medium">
                          Role: {p.role}
                        </p>
                        {p.packageDetails && (
                          <p className="text-gray-600 mb-1 font-medium">
                            Package: {p.packageDetails}
                          </p>
                        )}
                        <p className="text-gray-500 text-sm mb-3">
                          {p.date
                            ? new Date(p.date).toLocaleDateString()
                            : "N/A"}
                        </p>

                        {/* ✅ Apply Button */}
                        {isApplied ? (
                          <button
                            disabled
                            className="w-full py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed font-semibold"
                          >
                            ✅ Applied
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApplyPlacement(p.id)}
                            className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 hover:scale-105 transition-all duration-300 font-semibold"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 col-span-full">
                    No placements available.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
