const express = require('express')
const PatientController = require('../controllers/patientController')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    if (!req.session.user.role !== "Patient"){
      res.redirect(`/login?error=Please Login First`)
    } else {
      next()
    }
  })
// define the home page route
router.get('/', PatientController.showListDoctor)
router.get('/:DoctorId', PatientController.registerDoctorToPatient)
router.get(`/:DoctorId/chat`, PatientController.showChatFromPatient)
router.post(`/:DoctorId/chat`, PatientController.addChatFromPatient)

module.exports = router