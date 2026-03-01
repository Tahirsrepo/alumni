import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios/axiosInstance";
import axios from "axios";

const StudentPlacementPage = () => {
  const [placements, setPlacements] = useState([]);
  const [appliedPlacementIds, setAppliedPlacementIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("alumniToken")) {
      window.location.href = "/";
    }
  }, []);

  // ✅ Fetch placements from backend
  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const res = await axiosInstance.get("/placement");
        setPlacements(res.data);
      } catch (error) {
        console.error("Error fetching placements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacements();
  }, []);

  // ✅ Apply for placement
  const handleApplyPlacement = async (placementId) => {
    try {
      const studentDetails = JSON.parse(localStorage.getItem("alumniData"));
      if (!studentDetails?.id) {
        alert("Student details not found! Please log in again.");
        return;
      }

      const res = await axios.post(
        `http://localhost:8080/api/placement/apply?userId=${studentDetails.id}&placementId=${placementId}`
      );

      alert(res.data || "Applied successfully!");
      setAppliedPlacementIds((prev) => [...prev, placementId]);
    } catch (error) {
      console.error("Error applying for placement:", error);
      alert(error.response?.data || "Application failed.");
    }
  };

  // ✅ UI
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
        Placement Opportunities
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading placements...</p>
      ) : placements.length === 0 ? (
        <p className="text-gray-500">No placements available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.map((p) => {
            const isApplied = appliedPlacementIds.includes(p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-yellow-500"
              >
                {/* ✅ Image */}
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

                {/* ✅ Info */}
                <h3 className="font-bold text-lg mb-1">{p.company}</h3>
                <p className="text-gray-600 mb-1 font-medium">Role: {p.role}</p>
                {p.packageDetails && (
                  <p className="text-gray-600 mb-1 font-medium">
                    Package: {p.packageDetails}
                  </p>
                )}
                <p className="text-gray-500 text-sm mb-3">
                  {p.date ? new Date(p.date).toLocaleDateString() : "N/A"}
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
          })}
        </div>
      )}
    </div>
  );
};

export default StudentPlacementPage;
