const express = require('express')
const PatientController = require('../controllers/patientController')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    if (!req.session.user||req.session.user.role !== "Patient"){
      res.redirect(`/login?error=Please Login First`)
    } else {
      next()
    }
})
// define the home page route
router.get('/', PatientController.showListDoctor)
router.get(`/logout`, PatientController.logout)
router.get(`/medicine`, PatientController.showMedicine)
router.get(`/medicine/:MedicineId/buy`, PatientController.buyMedicine)
router.get('/:DoctorId', PatientController.registerDoctorToPatient)
router.get(`/:DoctorId/cancel`, PatientController.cancelConsultation)
router.get(`/:DoctorId/chat`, PatientController.showChatFromPatient)
router.post(`/:DoctorId/chat`, PatientController.addChatFromPatient)

module.exports = router