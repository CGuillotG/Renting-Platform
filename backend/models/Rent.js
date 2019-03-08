let moongose = require('mongoose')
let Schema = moongose.Schema

let rentSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    lessee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      enum: ['Pending', 'WaitingPay', 'Paid', 'OnLoan', 'Returned', 'Cancelled'],
      required: true
    },
    totalFee: {
      type: Number,
      required: true
    },
  },
  { timestamps: true, versionKey: false }
)

module.exports = moongose.model('Rent', rentSchema)