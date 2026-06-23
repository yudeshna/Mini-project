import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const JobSearch = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
  }, []);

  const fetchJobs = async (keyword = '') => {
    try {
      setLoading(true);
      const { data } = await API.get(`/jobs${keyword ? `?search=${keyword}` : ''}`);
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const { data } = await API.get('/applications/my');
      setAppliedJobs(data.map(app => app.job._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  const handleApply = async (jobId) => {
    try {
      setApplying(jobId);
      await API.post(`/applications/${jobId}`, { coverLetter });
      setAppliedJobs([...appliedJobs, jobId]);
      setSelectedJob(null);
      setCoverLetter('');
      alert('Applied successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply');
    }
    setApplying(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            onClick={() => navigate('/candidate/applications')}
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            My Applications
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
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, company, skills, location..."
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => { setSearch(''); fetchJobs(); }}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400"
          >
            Clear
          </button>
        </form>

        {/* Jobs List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <div key={job._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
                    {job.jobType}
                  </span>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-gray-500 text-sm">📍 {job.location}</p>
                  <p className="text-gray-500 text-sm">💰 {job.salary}</p>
                  <p className="text-gray-500 text-sm">🎓 {job.experience}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.map((skill, i) => (
                    <span key={i}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>
                {appliedJobs.includes(job._id) ? (
                  <button
                    disabled
                    className="w-full bg-green-100 text-green-600 p-3 rounded font-semibold"
                  >
                    ✅ Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-gray-600 mb-4">{selectedJob.company} • {selectedJob.location}</p>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter here..."
              className="w-full border border-gray-300 p-3 rounded mb-4"
              rows={5}
            />
            <div className="flex gap-3">
              <button
                onClick={() => handleApply(selectedJob._id)}
                disabled={applying === selectedJob._id}
                className="flex-1 bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
              >
                {applying === selectedJob._id ? 'Applying...' : 'Submit Application'}
              </button>
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 bg-gray-300 text-gray-700 p-3 rounded font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;