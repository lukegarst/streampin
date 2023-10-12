const asyncHandler = require('express-async-handler')


// @desc    Show media
// @route   GET /home
// @access  Private
const getMedia = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get media' })
})

// @desc    Add media
// @route   POST /home
// @access  Private
const postMedia = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please select media')
  }

  res.status(200).json({ message: 'Post media' })
})

// @desc    Update media
// @route   PUT /home/:id
// @access  Private
const updateMedia = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update media ${req.params.id}` })
})


// @desc    Delete media
// @route   DELETE /home/:id
// @access  Private
const deleteMedia = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete media ${req.params.id}` })
})

module.exports = {
  getMedia,
  postMedia,
  updateMedia,
  deleteMedia
}