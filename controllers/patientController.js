const { Op } = require("sequelize")
const { User, Doctor, Patient, Chat, Medicine, PatientMedicine } = require(`../models`)
const rupiah = require("../helper/formatRupiah")
class PatientController {
    static async showListDoctor(req,res){
        try {
            let {filter,search} = req.query
            let option = {order:[[`id`,`ASC`]]}
            if (filter) option.where = {specialist:filter}
            if (search) option.where = {name:{[Op.iLike]: `%${search}%`}}
            let patient = await Patient.findByPk(req.session.user.PatientId)
            let data = await Doctor.findAll(option)
            // console.log(data);
            res.render(`listDoctor`,{data,patient,rupiah})
        } catch (error) {
            res.send(error)
        }
    }

    static async logout(req,res){
        try {
            delete req.session.user
            res.redirect(`/login`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showMedicine(req,res){
        try {
            const {done} = req.query
            let data = await Medicine.findAll()
            res.render(`listMedicine`,{data,done})
        } catch (error) {
            res.send(error)
        }
    }

    static async buyMedicine(req,res){
        try {
            await PatientMedicine.create({MedicineId:req.params.MedicineId,PatientId:req.session.user.PatientId})
            res.redirect(`/patient/medicine?done=Thanks for buying our medicine`)
        } catch (error) {
            res.send(error)
        }
    }

    static async registerDoctorToPatient(req,res){
        try {
            // console.log(req.params.DoctorId,req.session.user);
            await Patient.update({DoctorId:req.params.DoctorId,status:"Waiting"},{where : {id:req.session.user.PatientId}})
            res.redirect(`/patient`)
        } catch (error) {
            res.send(error)
        }
    }

    static async cancelConsultation(req,res){
        try {
            await Chat.create({text:`Percakapan berakhir pada ${new Date()}`,DoctorId:req.params.DoctorId,PatientId:req.session.user.PatientId, from:`System`})
            await Patient.update({DoctorId:null,status:"Pending"}, {where:{id:req.session.user.PatientId}})
            res.redirect(`/patient`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showChatFromPatient(req,res){
        try {
            let doctor = await Doctor.findByPk(req.params.DoctorId)
            let data = await Chat.findAll({
                where:{[Op.and]: [{ DoctorId: req.params.DoctorId }, { PatientId: req.session.user.PatientId }]},
                order: [[`createdAt`,`ASC`]]
            })
            res.render(`chatFromPatient`,{data,doctor})
        } catch (error) {
            res.send(error)
        }
    }

    static async addChatFromPatient(req,res){
        try {
            const {text} = req.body
            await Chat.create({text,DoctorId:req.params.DoctorId, PatientId: req.session.user.PatientId, from:`Patient`})
            res.redirect(`/patient/${req.params.DoctorId}/chat`)
        } catch (error) {
            res.send(error)
        }
    }
    
}
module.exports = PatientController