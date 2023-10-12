const express = require('express')
const router = express.Router()
const { getMedia, postMedia, updateMedia, deleteMedia } = require('../controllers/mediaController')

router.route('/').get(getMedia).post(postMedia)

router.route('/:id').put(updateMedia).delete(deleteMedia)

module.exports = router