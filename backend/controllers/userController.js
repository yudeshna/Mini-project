const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// @desc    Update user profile
// @route   PUT /api/users/profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   user.name = req.body.name || user.name;
user.phone = req.body.phone || user.phone;
user.skills = req.body.skills || user.skills;

user.linkedin = req.body.linkedin || user.linkedin;
user.github = req.body.github || user.github;
user.education = req.body.education || user.education;
user.about = req.body.about || user.about;
    const updatedUser = await user.save();

   res.json({
  _id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  phone: updatedUser.phone,
  skills: updatedUser.skills,
  linkedin: updatedUser.linkedin,
  github: updatedUser.github,
  education: updatedUser.education,
  about: updatedUser.about,
  role: updatedUser.role,
  resume: updatedUser.resume
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload resume
// @route   POST /api/users/resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user._id);
    user.resume = req.file.filename;
    await user.save();

    res.json({
      message: 'Resume uploaded successfully',
      resume: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  getUserById,
  updateUserProfile,
  uploadResume
};