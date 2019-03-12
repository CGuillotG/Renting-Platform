let router = require('express').Router()
let Request = require('../models/Request')

//Middle wares
function isAuth(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.status(401).json({ message: "You haven't logged in yet." })
}

//generales
router.post('/',isAuth,  async (req, res, next) => {
  try {
    req.body.requester = req.user._id
    let request = await Request.create(req.body)
    res.status(201).json(request)
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let requests = await Request.find()
    res.status(200).json(requests)
  }
  catch (e) {
    next(e)
  }
})

//especificas
router.post('/:id', isAuth, async (req, res, next) => {
  try {
    let request = await Request.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(request)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', isAuth, async (req, res, next) => {
  try {
    let request = await Request.findById(req.params.id)
    res.status(200).json(request)
  }
  catch (e) {
    next(e)
  }
})

module.exports = router