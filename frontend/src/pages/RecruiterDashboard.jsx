import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const RecruiterDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showPostJob, setShowPostJob] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '', company: '', description: '',
    requirements: '', skills: '', location: '',
    salary: '', jobType: 'Full-time', experience: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get('/jobs');
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostJob = async () => {
    try {
      const skillsArray = jobForm.skills.split(',').map(s => s.trim());
      await API.post('/jobs', { ...jobForm, skills: skillsArray });
      setShowPostJob(false);
      fetchJobs();
      alert('Job posted successfully!');
    } catch (error) {
      alert('Failed to post job');
    }
  };
  const handleDeleteJob = async (jobId) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this job?'
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/jobs/${jobId}`);

    setJobs(prevJobs =>
      prevJobs.filter(job => job._id !== jobId)
    );

    alert('Job deleted successfully');
  } catch (error) {
    console.error(error);
    alert('Failed to delete job');
  }
};

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">ATS System — Recruiter</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">Welcome, {user?.name}</span>
          <button
            onClick={() => setShowPostJob(true)}
            className="bg-white text-green-600 px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Post Job
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
        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Posted Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            <div className="space-y-3">
              {jobs.map(job => (
                <div key={job._id}
                  className="border border-gray-200 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-gray-500 text-sm">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex gap-2">
  <button
    onClick={() => navigate(`/recruiter/jobs/${job._id}/applications`)}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    View Applications
  </button>

  <button
    onClick={() => handleDeleteJob(job._id)}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>
                  

  
</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
            <div className="space-y-3">
              {['title', 'company', 'location', 'salary', 'experience'].map(field => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={jobForm[field]}
                  onChange={(e) => setJobForm({...jobForm, [field]: e.target.value})}
                  className="w-full border border-gray-300 p-3 rounded"
                />
              ))}
              <textarea
                placeholder="Job Description"
                value={jobForm.description}
                onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded"
                rows={3}
              />
              <textarea
                placeholder="Requirements"
                value={jobForm.requirements}
                onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded"
                rows={2}
              />
              <input
                type="text"
                placeholder="Skills (comma separated: React, Node.js, Python)"
                value={jobForm.skills}
                onChange={(e) => setJobForm({...jobForm, skills: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded"
              />
              <select
                value={jobForm.jobType}
                onChange={(e) => setJobForm({...jobForm, jobType: e.target.value})}
                className="w-full border border-gray-300 p-3 rounded"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePostJob}
                className="flex-1 bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700"
              >
                Post Job
              </button>
              <button
                onClick={() => setShowPostJob(false)}
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

export default RecruiterDashboard;