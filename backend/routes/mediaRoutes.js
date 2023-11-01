const express = require('express')
const router = express.Router()
const { 
  getMedia, 
  postMedia, 
  updateMedia, 
  deleteMedia,
} = require('../controllers/mediaController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getMedia).post(protect, postMedia)

router.route('/:id').put(protect, updateMedia).delete(protect, deleteMedia)

module.exports = router