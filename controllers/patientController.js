const { Op } = require("sequelize")
const { User, Doctor, Patient, Chat } = require(`../models`)
class PatientController {
    static async showListDoctor(req,res){
        try {
            let data = await Doctor.findAll()
            res.render(`listDoctor`,{data})
        } catch (error) {
            res.send(error)
        }
    }

    static async registerDoctorToPatient(req,res){
        try {
            const {DoctorId} = req.body
            await Patient.update({DoctorId},{where : {PatientId:req.session.PatientId}})
            res.redirect(`/patient`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showChatFromPatient(req,res){
        try {
            let doctor = await Doctor.findByPk(req.params.DoctorId)
            let data = await Chat.findAll({
                where:{[Op.and]: [{ DoctorId: req.params.DoctorId }, { UserId: req.session.user.PatientId }]},
                order: [[`createdAt`,`ASC`]]
            })
            res.render(`chat`,{data,doctor})
        } catch (error) {
            res.render
        }
    }

    static async addChatFromPatient(req,res){
        try {
            const {text} = req.body
            await Chat.create({text,DoctorId:req.params.DoctorId, PatientId: req.session.user.PatientId})
            res.redirect(`./patient/${req.params.DoctorId}/chat`)
        } catch (error) {
            res.send(error)
        }
    }
    
}
module.exports = PatientController