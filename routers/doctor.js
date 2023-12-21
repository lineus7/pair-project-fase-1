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
router.get('/', DoctorController.showListPatient)
router.get('/:PatientId/cancel', DoctorController.cancelPatient)
router.get('/:PatientId/accept', DoctorController.acceptPatient)
router.get(`/:PatientId/chat`, DoctorController.showChatFromDoctor)
router.post(`/:PatientId/chat`, DoctorController.addChatFromDoctor)
router.get(`/:PatientId/end`, DoctorController.endChat) 



module.exports = router