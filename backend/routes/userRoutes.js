const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getUserById,
  updateUserProfile,
  uploadResume
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/profile', protect, getUserProfile);
router.get('/:id', protect, getUserById);
router.put('/profile', protect, updateUserProfile);
router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;