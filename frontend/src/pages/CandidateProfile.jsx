import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../utils/api";

const CandidateProfile = () => {
  const { candidateId } = useParams();
  const [searchParams] = useSearchParams();

const applicationId = searchParams.get("applicationId");

  const [candidate, setCandidate] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  phone: '',
  skills: '',
  education: '',
  linkedin: '',
  github: '',
  about: ''
});

  useEffect(() => {
    fetchCandidate();
  }, [candidateId]);

 
 const fetchCandidate = async () => {
  try {

    if (candidateId) {
      // Recruiter viewing candidate
      const { data } = await API.get(`/users/${candidateId}`);
      setCandidate(data);
      if (applicationId) {
  const appRes = await API.get(`/applications/${applicationId}`);
  setApplication(appRes.data);
}
       setFormData({
    phone: data.phone || '',
    skills: data.skills?.join(', ') || '',
    education: data.education || '',
    linkedin: data.linkedin || '',
    github: data.github || '',
    about: data.about || ''
  });

    } else {
      // Candidate viewing own profile
      const { data } = await API.get('/users/profile');
      setCandidate(data);
      setFormData({
  phone: data.phone || '',
  skills: data.skills?.join(', ') || '',
  education: data.education || '',
  linkedin: data.linkedin || '',
  github: data.github || '',
  about: data.about || ''
});
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return <div className="p-8">Loading...</div>;
  }
  const updateStatus = async (status) => {
  try {
    await API.put(`/applications/${applicationId}/status`, {
      status
    });

    alert(`Candidate ${status} successfully`);
  } catch (error) {
    console.error(error);
    alert("Failed to update status");
  }
};
const handleSaveProfile = async () => {
  try {
    const { data } = await API.put('/users/profile', {
      phone: formData.phone,
      skills: formData.skills
        .split(',')
        .map(skill => skill.trim()),
      linkedin: formData.linkedin,
      github: formData.github,
      education: formData.education,
      about: formData.about
    });

    setCandidate(data);
    setIsEditing(false);

    alert('Profile updated successfully!');
  } catch (error) {
    console.error(error);
    alert('Failed to update profile');
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow">

       <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">
    Candidate Profile
  </h1>

 {!candidateId && (
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    {isEditing ? "Cancel" : "Edit Profile"}
  </button>
)}
</div>

        <p><strong>Name:</strong> {candidate?.name}</p>

        <p><strong>Email:</strong> {candidate?.email}</p>
        {application && (
  <>
    <p>
      <strong>ATS Score:</strong> {application.atsScore}%
    </p>

    <p>
      <strong>Status:</strong> {application.status}
    </p>
  </>
)}
{candidateId && (
  <div className="mt-4 flex gap-3">
    <button
      onClick={() => updateStatus("reviewing")}
      className="bg-yellow-500 text-white px-4 py-2 rounded"
    >
      Reviewing
    </button>

    <button
      onClick={() => updateStatus("shortlisted")}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Shortlist
    </button>

    <button
      onClick={() => updateStatus("rejected")}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Reject
    </button>
  </div>
)}
       {isEditing ? (
  <div className="space-y-4 mt-4">

    <input
  type="text"
  placeholder="Phone"
  value={formData.phone}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData({
      ...formData,
      phone: value
    });
  }}
  className="w-full border p-2 rounded"
/>

    <input
      type="text"
      placeholder="Skills (comma separated)"
      value={formData.skills}
      onChange={(e) =>
        setFormData({ ...formData, skills: e.target.value })
      }
      className="w-full border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Education"
      value={formData.education}
      onChange={(e) =>
        setFormData({ ...formData, education: e.target.value })
      }
      className="w-full border p-2 rounded"
    />

    <input
      type="text"
      placeholder="LinkedIn"
      value={formData.linkedin}
      onChange={(e) =>
        setFormData({ ...formData, linkedin: e.target.value })
      }
      className="w-full border p-2 rounded"
    />

    <input
      type="text"
      placeholder="GitHub"
      value={formData.github}
      onChange={(e) =>
        setFormData({ ...formData, github: e.target.value })
      }
      className="w-full border p-2 rounded"
    />

    <textarea
      placeholder="About Me"
      value={formData.about}
      onChange={(e) =>
        setFormData({ ...formData, about: e.target.value })
      }
      className="w-full border p-2 rounded"
      rows="4"
    />
    <button
  onClick={handleSaveProfile}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  Save Profile
</button>

  </div>
) : (
  <>
    <p><strong>Phone:</strong> {candidate?.phone || "Not Provided"}</p>

    <p><strong>Education:</strong> {candidate?.education || "Not Provided"}</p>

    <p><strong>LinkedIn:</strong> {candidate?.linkedin || "Not Provided"}</p>

    <p><strong>GitHub:</strong> {candidate?.github || "Not Provided"}</p>

    <p><strong>About:</strong> {candidate?.about || "Not Provided"}</p>

    <p className="mt-4">
      <strong>Skills:</strong>
    </p>

    <ul className="list-disc ml-6">
      {candidate?.skills?.length > 0 ? (
        candidate.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))
      ) : (
        <li>No skills added</li>
      )}
    </ul>

    

     
  </>
)}

      </div>
    </div>
  );
};

export default CandidateProfile;