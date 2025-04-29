const Election = require('../models/Election');

// Public to authenticated users
exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find().select('-votedUsers');
    res.json(elections);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: 'Not found' });
    res.json(election);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.vote = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: 'Not found' });
    if (election.votedUsers.includes(req.user.id))
      return res.status(400).json({ message: 'Already voted' });
    const candidate = election.candidates.id(req.body.candidateId);
    if (!candidate) return res.status(400).json({ message: 'Invalid candidate' });
    candidate.votes++;
    election.votedUsers.push(req.user.id);
    await election.save();
    res.json({ message: 'Vote recorded' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Admin-only controllers
exports.createElection = async (req, res) => {
  try {
    const { name, status, candidates } = req.body;
    const election = new Election({ name, status, candidates, createdBy: req.user.id });
    await election.save();
    res.status(201).json(election);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: 'Not found' });
    const { name, status, candidates } = req.body;
    if (name) election.name = name;
    if (status) election.status = status;
    if (candidates) election.candidates = candidates;
    await election.save();
    res.json(election);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: 'Not found' });
    await election.remove();
    res.json({ message: 'Election deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};