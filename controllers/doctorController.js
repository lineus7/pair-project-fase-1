const { Op } = require("sequelize")
const { User, Doctor, Patient ,Chat} = require(`../models`)

class DoctorController {
    static async showListPatient(req,res){
        try {
            let data = await Patient.findAll({where:{DoctorId:req.session.user.DoctorId}})
            res.render(`listPatient`,{data})
        } catch (error) {
            res.send(error)
        }
    }

    static async logout(req,res){
        try {
            delete req.session.user
            res.redirect(`/`)
        } catch (error) {
            res.send(error)
        }
    }

    static async cancelPatient(req,res){
        try {
            await Patient.update({DoctorId:null,status:`Pending`},{
                where : {id:req.params.PatientId}
            })
            res.redirect(`/doctor`)
        } catch (error) {
            res.send(error)
        }
    }

    static async acceptPatient(req,res){
        try {
            await Patient.update({status:`Accepted`},{
                where : {id:req.params.PatientId}
            })
            res.redirect(`/doctor`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showChatFromDoctor(req,res){
        try {
            let data = await Chat.findAll({
                where : {[Op.and]: [{ DoctorId: req.session.DoctorId }, { PatientId: req.params.PatientId }]},
                order : [[`createdAt`,`ASC`]]
            })
            res.render(`chatFromDoctor`,{data})
        } catch (error) {
            res.send(error)
        }
    }

    static async addChatFromDoctor(req,res){
        try {
            const {text} = req.body
            await Chat.create({text,DoctorId:req.session.id,PatientId:req.params.PatientId, from:`Patient`})
            res.redirect(`/doctor/${req.params.PatientId}/chat`)
        } catch (error) {
            res.send(error)
        }
    }

    static async endChat(req,res){
        try {
            await Patient.update({DoctorId:null,status:`Pending`})
            res.redirect(`/doctor`)
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = DoctorController