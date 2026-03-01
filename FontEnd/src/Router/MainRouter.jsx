import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../Components/LandingPage";
import StudentRegister from "../Auth/StudentRegistrationPage";
import AdminSignUp from "../Auth/AdminRegistrationPage.jsx";
import AlumniSignUp from "../Auth/AlumniSignUp.jsx";
import StudentLogin from "../Auth/StudentLogin.jsx";
import AdminLogin from "../Auth/AdminLogin.jsx";
import AlumniLogin from "../Auth/AlumniLogin.jsx";
import AdminDashboard from "../AdminDashboards/AdminDashboard.jsx";
import Adminalumni from "../AdminDashboards/Adminalumni.jsx";
import Adminevents from "../AdminDashboards/Adminevents.jsx";
import Adminplacements from "../AdminDashboards/Adminplacements.jsx";
import StudentDashboard from "../StudentDashboard/StudentDashboard.jsx";
import Alumnidashboard from "../Alumnidashboard/Alumnidashboard.jsx";
import AdminAlumniList from "../AdminDashboards/AdminAlumniList.jsx";
import AdminStudentList from "../AdminDashboards/AdminStudentList.jsx";
import AluminMentorship from "../Alumnidashboard/AluminMentorship.jsx";
import EventPage from "../RouterPages/EventPage.jsx";
import StudentPlacementPage from '../Alumnidashboard/PlacementPage.jsx'


const MainRouter = () => {
  return (
    <div>
      <Routes>
        {/* Register Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup/student" element={<StudentRegister />} />
        <Route path="/signup/admin" element={<AdminSignUp />} />
        <Route path="/signup/Alumni" element={<AlumniSignUp />} />

        {/* Login Routes */}
        <Route path="/login/Student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/alumni" element={<AlumniLogin />} />

        {/* Admin DashBoard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/alumni" element={<Adminalumni />} />
        <Route path="/admin/events" element={<Adminevents />} />
        <Route path="/admin/placements" element={<Adminplacements />} />
        <Route path="/admin/Alumnilist" element={<AdminAlumniList/>}/>
        <Route path="/admin/students" element={<AdminStudentList/>}/>

        {/* Student DashBoard */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Alumni DashBoard */}
        <Route path="/alumni/dashboard" element={<Alumnidashboard />} />
        <Route path="/alumni/mentorship" element={<AluminMentorship/>}/>
        <Route path="/alumni/Offers" element={<StudentPlacementPage/>}/>

        {/* Routes Pages */}
        <Route path="/events" element={<EventPage/>}/>
        
      </Routes>
    </div>
  );
};

export default MainRouter;
