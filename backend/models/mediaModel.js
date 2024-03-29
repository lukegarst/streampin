const mongoose = require('mongoose')

const mediaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Media', mediaSchema)