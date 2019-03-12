let router = require('express').Router()
let Product = require('../models/Product')

//generales
router.post('/', async (req, res, next) => {
  try {
    let product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.find()
    res.status(200).json(products)
  }
  catch (e) {
    next(e)
  }
})

//especificas
router.post('/:id', async (req, res, next) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(product)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id)
    res.status(200).json(product)
  }
  catch (e) {
    next(e)
  }
})

module.exports = router