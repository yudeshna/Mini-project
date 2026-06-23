const Notification = require('../models/Notification');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const axios = require('axios');
console.log("APPLICATION CONTROLLER LOADED");


// @desc    Apply for a job
// @route   POST /api/applications/:jobId
const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = await Application.findOne({
      job: req.params.jobId,
      candidate: req.user._id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: 'Already applied for this job'
      });
    }

    const application = await Application.create({
      job: req.params.jobId,
      candidate: req.user._id,
      coverLetter: req.body.coverLetter || ''
    });

    const candidate = await User.findById(req.user.id);

    console.log('Candidate:', candidate);
    console.log('Resume:', candidate?.resume);

    if (candidate?.resume) {
      try {
        const resumePath =
          `${process.cwd()}/uploads/${candidate.resume}`;

        console.log("Resume Path:", resumePath);
        console.log("JOB TITLE:", job.title);
        console.log("JOB SKILLS:", job.skills);
        console.log("JOB DESCRIPTION:", job.description);

        const aiResponse = await axios.post(
          'http://127.0.0.1:8000/score',
          {
            resumePath,
            jobDescription: job.description,
            skills: job.skills
          }
        );

        console.log("AI RESPONSE:", aiResponse.data);

        application.atsScore = aiResponse.data.atsScore || 0;
        application.skills = aiResponse.data.matchedSkills || [];

        await application.save();

        console.log(
          "ATS Score Saved:",
          application.atsScore
        );

      } catch (err) {
        console.log(
          "AI scoring failed:",
          err.message
        );

        if (err.response) {
          console.log(
            "Error Data:",
            err.response.data
          );
        }
      }
    }

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// @desc    Get my applications (candidate)
// @route   GET /api/applications/my
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id
    })
      .populate('job', 'title company location salary jobType')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for a job (recruiter)
// @route   GET /api/applications/job/:jobId
const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applications = await Application.find({
      job: req.params.jobId
    })
      .populate('candidate', 'name email phone skills')
      .sort({ atsScore: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (recruiter)
// @route   PUT /api/applications/:id/status
const updateApplicationStatus = async (req, res) => {
  try {
    console.log("updateApplicationStatus called");
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

   application.status = req.body.status;
await application.save();

const notification = await Notification.create({
  user: application.candidate,
  message: `Your application status changed to ${req.body.status}`
});

console.log("Notification Created:", notification);

res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: 'Application not found'
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  getApplicationById
};