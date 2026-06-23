import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const MyApplications = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await API.get('/applications/my');
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-600';
      case 'reviewing': return 'bg-yellow-100 text-yellow-600';
      case 'shortlisted': return 'bg-green-100 text-green-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      case 'hired': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">ATS System</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">Welcome, {user?.name}</span>
          <button
            onClick={() => navigate('/candidate/dashboard')}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/jobs')}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Find Jobs
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No applications yet.</p>
            <button
              onClick={() => navigate('/jobs')}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
            >
              Find Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {app.job?.title}
                    </h3>
                    <p className="text-gray-600">{app.job?.company}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      📍 {app.job?.location} • 💰 {app.job?.salary}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                    <p className="text-blue-600 font-bold mt-2">
                      ATS Score: {app.atsScore}%
                    </p>
                    {app.skills?.length > 0 && (
                      <p className="text-gray-500 text-sm mt-1">
                        Matched: {app.skills.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;