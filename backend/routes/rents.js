let router = require('express').Router()
let Rent = require('../models/Rent')
let mongoose = require('mongoose')

//Middle wares
function isAuth(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(401).json({ message: "You haven't logged in yet." })
}

//generales
router.post('/', isAuth, async (req, res, next) => {
  try {
    req.body.lessee = req.user._id
    let rent = await Rent.create(req.body)
    res.status(201).json(rent)
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let rents = await Rent.find()
    res.status(200).json(rents)
  }
  catch (e) {
    next(e)
  }
})

//especificas
router.post('/:id', isAuth, async (req, res, next) => {
  try {
    let rent = await Rent.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(rent)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let rent = await Rent.findById(req.params.id)
    res.status(200).json(rent)
  }
  catch (e) {
    next(e)
  }
})

module.exports = router