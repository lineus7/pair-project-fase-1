const { Op } = require("sequelize")
const { User, Doctor, Patient ,Chat,Medicine, PatientMedicine} = require(`../models`);
const rupiah = require("../helper/formatRupiah");
const pdfkit = require("../helper/pdfkit");

class DoctorController {
    static async showListPatient(req,res){
        try {
            console.log(req.session.user);
            let data = await Patient.findAll({where:{DoctorId:req.session.user.DoctorId}})
            console.log(data);
            res.render(`listPatient`,{data})
        } catch (error) {
            res.send(error)
        }
    }

    static async pdfPatient(req,res){
        try {
            let patient = await Patient.findAll({include:Medicine})
            let header = [`Name`,`Gender`,`Age`,`Total Purchase`,`Purchase History`]
            let arrData = [] 
            patient.forEach(el => {
                let arr = [el.name,el.gender,el.age,el.Medicines.length, el.Medicines.length === 0 ? `Belum Membeli Obat` : el.Medicines.map(el=>el.name).join("\n") ]
                arrData.push(arr)
            })
            console.log(arrData);
            pdfkit(`Patient`,header,arrData)
            res.redirect(`/doctor/statistic`)
        } catch (error) {
            res.send(error)
        }
    }


    static async pdfMedicine(req,res){
        try {
            let medicine =  await Medicine.findAll({include:Patient})
            let header = [`Name`,`Type`,`Price`,`Total Purchase`]
            let arrData = [] 
            medicine.forEach(el => {
                let arr = [el.name,el.type,rupiah(el.price),el.Patients.length]
                arrData.push(arr)
            })
            console.log(arrData);
            pdfkit(`Medicine`,header,arrData)
            res.redirect(`/doctor/statistic`)
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

    static async showStatistic(req,res){
        try {
            let data = await Patient.findAll({include:Medicine})
            let medicine =  await Medicine.findAll({include:Patient})
            console.log(medicine);
            res.render(`statistic`,{data,medicine,rupiah})
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
            console.log(req.session.user);
            let patient = await Patient.findByPk(req.params.PatientId)
            let data = await Chat.findAll({
                where : {[Op.and]: [{ DoctorId: req.session.user.DoctorId }, { PatientId: req.params.PatientId }]},
                order : [[`createdAt`,`ASC`]]
            })
            res.render(`chatFromDoctor`,{data,patient})
        } catch (error) {
            res.send(error)
        }
    }

    static async addChatFromDoctor(req,res){
        try {
            const {text} = req.body
            await Chat.create({text,DoctorId:req.session.user.DoctorId,PatientId:req.params.PatientId, from:`Doctor`})
            res.redirect(`/doctor/${req.params.PatientId}/chat`)
        } catch (error) {
            res.send(error)
        }
    }

    static async endChat(req,res){
        try {
            await Patient.update({DoctorId:null,status:`Pending`},{
                where:{id:req.params.PatientId}
            })
            await Chat.create({text:`Percakapan berakhir pada ${new Date()}`,DoctorId:req.session.user.DoctorId,PatientId:req.params.PatientId, from:`System`})
            res.redirect(`/doctor`)
        } catch (error) {
            res.send(error)
        }
    }

    static async deletePost(req,res){
        try {
            await Chat.destroy({where :{id:req.params.ChatId}})
            res.redirect(`/doctor/${req.params.PatientId}/chat`)
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = DoctorController