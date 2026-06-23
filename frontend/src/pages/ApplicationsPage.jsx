import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const ApplicationsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [jobResponse, applicationsResponse] = await Promise.all([
        API.get(`/jobs/${jobId}`),
        API.get(`/applications/job/${jobId}`)
      ]);

      setJob(jobResponse.data);
      setApplications(applicationsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow p-6">

        {/* Job Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {job?.title}
          </h1>

          <p className="text-gray-500">
            {job?.company} • {job?.location}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Total Applications: {applications.length}
          </p>
        </div>

        {/* Applications List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Applicants
          </h2>

          {applications.length === 0 ? (
            <p className="text-gray-500">
              No applications yet.
            </p>
          ) : (
            <div className="space-y-4">
             {applications.map((app) => {
  console.log(app);

  return (
    <div
      key={app._id}
      className="border border-gray-200 rounded-lg p-4"
    >
      <h3 className="font-semibold text-lg">
  {app.candidate?.name}
</h3>



      <p className="text-gray-500">
        {app.candidate?.email}
      </p>

      <p className="text-blue-600 font-semibold mt-2">
        ATS Score: {app.atsScore}%
      </p>

      <p className="text-gray-500 mt-1">
        Status: {app.status}
      </p>
      <button
    onClick={() =>
  navigate(
    `/recruiter/candidates/${app.candidate?._id}?applicationId=${app._id}`
  )
}
  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  View Profile
</button>
    </div>
  );
})}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationsPage;