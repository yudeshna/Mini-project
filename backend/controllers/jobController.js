const Job = require('../models/Job');

// @desc    Create a job
// @route   POST /api/jobs
const createJob = async (req, res) => {
  try {
    const { title, company, description, requirements, skills, location, salary, jobType, experience } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      requirements,
      skills,
      location,
      salary,
      jobType,
      experience,
      recruiter: req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { title: { $regex: req.query.search, $options: 'i' } },
            { company: { $regex: req.query.search, $options: 'i' } },
            { skills: { $regex: req.query.search, $options: 'i' } },
            { location: { $regex: req.query.search, $options: 'i' } }
          ]
        }
      : {};

    const jobs = await Job.find({ ...keyword, isActive: true })
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('recruiter', 'name email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };