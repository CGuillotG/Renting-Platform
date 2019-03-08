let moongose = require('mongoose')
let Schema = moongose.Schema

let reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { timestamps: true, versionKey: false }
)

module.exports = moongose.model('Review', reviewSchema)