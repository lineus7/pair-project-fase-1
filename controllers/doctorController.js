const { User, Doctor, Patient } = require(`../models`)

class DoctorController {
    static async showListPatient(req,res){
        try {
            let data = await Patient.findAll({where:{DoctorId:req.session.user.DoctorId}})
            res.render(`listPatient`,{data})
        } catch (error) {
            res.send(error)
        }
    }
}
module.exports = DoctorController