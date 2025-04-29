const mongoose = require('mongoose');
const CandidateSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  votes: { type: Number, default: 0 }
});
const ElectionSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  status:      { type: String, enum: ['upcoming','active','finished'], default: 'upcoming' },
  candidates:  [CandidateSchema],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votedUsers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
module.exports = mongoose.model('Election', ElectionSchema);