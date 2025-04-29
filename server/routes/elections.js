const express = require('express');
const router = express.Router();
const auth    = require('../middleware/auth');
const admin   = require('../middleware/admin');
const {
  getElections,
  getElectionById,
  vote,
  createElection,
  updateElection,
  deleteElection
} = require('../controllers/electionController');

// Public (authenticated)
router.get('/', auth, getElections);
router.get('/:id', auth, getElectionById);
router.post('/:id/vote', auth, vote);

// Admin-only
router.post('/', auth, admin, createElection);
router.put('/:id', auth, admin, updateElection);
router.delete('/:id', auth, admin, deleteElection);

module.exports = router;