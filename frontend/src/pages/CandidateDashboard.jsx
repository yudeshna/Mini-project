import { FaBell, FaUser } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import API from "../utils/api";

const CandidateDashboard = () => {
  console.log("Component Rendered");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
const [profileCompletion, setProfileCompletion] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
useEffect(() => {
  alert("Dashboard Loaded");
  fetchDashboardData();
}, []);
const fetchDashboardData = async () => {
  try {
    const appRes = await API.get("/applications/my");
    console.log("Applications:", appRes.data);
    setApplications(appRes.data);

    const profileRes = await API.get("/users/profile");
    console.log("Profile:", profileRes.data);

    const userData = profileRes.data;

    const fields = [
      userData.name,
      userData.phone,
      userData.skills?.length > 0,
      userData.education,
      userData.linkedin,
      userData.github,
      userData.about,
      userData.resume
    ];

    const completed = fields.filter(Boolean).length;

    setProfileCompletion(
      Math.round((completed / fields.length) * 100)
    );

  } catch (error) {
    console.error(error);
  }
};
const totalApplications = applications.length;

const underReview = applications.filter(
  app => app.status === "reviewing"
).length;

const averageATS =
  applications.length > 0
    ? Math.round(
        applications.reduce(
          (sum, app) => sum + (app.atsScore || 0),
          0
        ) / applications.length
      )
    : 0;
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          ATS System
        </h1>

        <div className="flex items-center gap-4">
        <span className="text-white">
  Hi, {user?.name}
</span>

<button
  onClick={() => navigate('/jobs')}
  className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
>
  Find Jobs
</button>

<button
  onClick={() => navigate('/candidate/applications')}
  className="bg-white text-blue-600 px-4 py-2 rounded font-semibold"
>
  My Applications
</button>

<button
  onClick={() => navigate('/candidate/notifications')}
  className="text-white text-xl"
>
  <FaBell />
</button>

<button
  onClick={() => navigate('/candidate/profile')}
  className="text-white text-xl"
>
  <FaUser />
</button>

<button
  onClick={handleLogout}
  className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
>
  Logout
</button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Candidate Dashboard
        </h2>

        <p className="text-gray-500 mb-8">
          Track your applications, interviews, and job search activity.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Applications
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {totalApplications}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              Under Review
            </h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {underReview}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
  <h3 className="text-lg font-semibold text-gray-700">
    Profile Completion
  </h3>

  <p className="text-3xl font-bold text-green-600 mt-2">
    {profileCompletion}%
  </p>
</div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">
              ATS Score
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {averageATS}%
            </p>
          </div>

        </div>

        {/* Recent Activity */}
<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-xl font-bold text-gray-800 mb-4">
    Recent Activity
  </h3>

  {applications.length > 0 ? (
    <div className="space-y-3">
      {applications.slice(0, 5).map((app) => (
        <div
          key={app._id}
          className="border-b pb-2"
        >
          <p className="font-medium">
            Applied for {app.job?.title || "Unknown Job"}
          </p>

          <p className="text-sm text-gray-500">
            Status: {app.status}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">
      No recent activity available.
    </p>
  )}
</div>

      </div>
    </div>
  );
};

export default CandidateDashboard;