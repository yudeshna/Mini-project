const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['candidate', 'recruiter', 'admin'],
    default: 'candidate'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  skills: {
  type: [String],
  default: []
},
  resume: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },

  linkedin: {
  type: String,
  default: ''
},

github: {
  type: String,
  default: ''
},

education: {
  type: String,
  default: ''
},

about: {
  type: String,
  default: ''
}
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);