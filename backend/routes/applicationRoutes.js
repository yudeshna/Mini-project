const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  getApplicationById
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.post('/:jobId', protect, applyForJob);
router.get('/my', protect, getMyApplications);
router.get('/job/:jobId', protect, getJobApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id/status', protect, updateApplicationStatus);

module.exports = router;