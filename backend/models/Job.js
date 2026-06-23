const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  skills: [String],
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    default: 'Not Disclosed'
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  experience: {
    type: String,
    default: 'Fresher'
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);