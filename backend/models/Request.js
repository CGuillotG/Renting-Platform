let moongose = require('mongoose')
let Schema = moongose.Schema

let requestSchema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    requester: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    requestStatus: {
      type:String,
      enum: ['Pending', 'Offered', 'Cancelled'],
      default: 'Pending',
      required: true
    },
    newRent: {
      type: Schema.Types.ObjectId,
      ref: 'Rent'
    }
  },
  { timestamps: true, versionKey: false }
)

module.exports = moongose.model('Request', requestSchema)
