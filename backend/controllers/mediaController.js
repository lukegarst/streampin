const asyncHandler = require('express-async-handler')

const Media = require('../models/mediaModel')
const User = require('../models/userModel')

const getMedia = asyncHandler(async (req, res) => {
  const media = await Media.find({ user: req.user.id })

  res.status(200).json(media)
})

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

const updateMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)

  if(!media) {
    res.status(400)
    throw new Error('media not found')
  }

  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if(media.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
  })

  res.status(200).json(updatedMedia)
})

const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id)

  if(!media) {
    res.status(400)
    throw new Error('media not found')
  }

  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

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