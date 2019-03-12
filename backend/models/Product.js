let moongose = require('mongoose')
let Schema = moongose.Schema

//** add complex validation

let productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    usedPrice: {
      type: Number,
      required: true
    },
    rentDay1: {
      type: Number,
      required: true
    },
    rentDay3: {
      type: Number,
      required: true
    },
    rentDay7: {
      type: Number,
      required: true
    },
    availability: {
      type: String,
      required: true,
      enum: ['All', 'WorkWeek', 'WeekEnd']
    },
    pickAtAddress: {
      type: Boolean,
      required: true
    },
    productPics: {
      type: [String],
      required: true
    },
    lessor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    productRating: {
      type: Number,
      required: true
    },
    rent: {
      type: Schema.Types.ObjectId,
      ref: 'Rent'
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    questions: {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    },
    details: String
  },
  { timestamps: true, versionKey: false }
)

module.exports = moongose.model('Product', productSchema)
