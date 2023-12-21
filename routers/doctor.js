const express = require('express')
const DoctorController = require('../controllers/doctorController')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  if (!req.session.user.role !== "Doctor"){
    res.redirect(`/login?error=Please Login First`)
  } else {
    next()
  }
})
// define the home page route
router.get('/:id', DoctorController.showListPatient)
router.get('/:id')
router.get('/:id')
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router