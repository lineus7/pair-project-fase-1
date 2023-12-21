const express = require('express')
const router = express.Router()
const doctor = require(`./doctor`)
const patient = require(`./patient`)
const Controller = require('../controllers/controller')

// middleware that is specific to this router
router.use(`/doctor`,doctor)
router.use(`/patient`,patient)
// define the home page route
router.get('/')
router.get(`/login`)
router.get(`/register/doctor`, Controller.showRegisterDoctor)
router.post(`/register/doctor`, Controller.addDoctor)
router.get(`/register/patient`, Controller.showRegisterPatient)
router.post(`/register/patient`, Controller.addPatient)


module.exports = router