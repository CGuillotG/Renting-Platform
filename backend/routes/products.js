let router = require('express').Router()
let Product = require('../models/Product')
let mongoose = require('mongoose')

//Middle wares
function isAuth(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(401).json({ message: "You haven't logged in yet." })
}

//generales
router.post('/', isAuth, async (req, res, next) => {
  try {
    req.body.lessor = req.user._id
    let product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'lessor', 
          'foreignField': '_id', 
          'as': 'lessor'
        }
      }, {
        '$sort': {
          'createdAt': -1
        }
      }
    ])
    res.status(200).json(products)
  }
  catch (e) {
    next(e)
  }
})

//especificas
router.post('/:id', isAuth, async (req, res, next) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(product)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  let {id}=req.params
  try {
    let product = await Product.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'lessor', 
          'foreignField': '_id', 
          'as': 'lessor'
        }
      }, {
        '$match': {
          '_id': mongoose.Types.ObjectId(id)
        }
      }
    ])
    res.status(200).json(product)
  }
  catch (e) {
    next(e)
  }
})

module.exports = router