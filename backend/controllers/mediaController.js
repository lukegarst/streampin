const asyncHandler = require('express-async-handler')

const Media = require('../models/mediaModel')
const User = require('../models/userModel')

// @desc    Show media
// @route   GET /home
// @access  Private
const getMedia = asyncHandler(async (req, res) => {
  const media = await Media.find({ user: req.user.id })

  res.status(200).json(media)
})

// @desc    Add media
// @route   POST /home
// @access  Private
const postMedia = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const media = await Media.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(media)
})

// @desc    Update media
// @route   PUT /home/:id
// @access  Private
const updateMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)

  if(!media) {
    res.status(400)
    throw new Error('media not found')
  }

  const user = await User.findById(req.user.id)

  //Check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the media user
  if(media.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
  })

  res.status(200).json(updatedMedia)
})

// @desc    Delete media
// @route   DELETE /home/:id
// @access  Private
const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)

  if(!media) {
    res.status(400)
    throw new Error('media not found')
  }

  const user = await User.findById(req.user.id)

  //Check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Make sure the logged in user matches the media user
  if(media.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await media.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMedia,
  postMedia,
  updateMedia,
  deleteMedia
}