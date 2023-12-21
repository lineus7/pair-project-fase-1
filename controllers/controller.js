const {User,Doctor} = require(`../models`)
class Controller {

    static showRegisterDoctor(req,res){
        try {
            let error = req.query.error?.split(`,`)
            res.render(`showRegisterDoctor`,{error})
        } catch (error) {
            res.send(error)
        }
    }

    
    static async addDoctor(req,res){
        try {
            const {username,password} = req.body
            let data = await User.create({username,password,role:`Doctor`})
            
            const {name,sip,specialist,hospital,exp,price} = req.body
            await Doctor.create({name,sip,specialist,hospital,exp,price,UserId:data.id})
            
            res.redirect(`/login`)
        } catch (error) {
            if (error.name === `SequlizeValidationError`){
                let errorArr = error.errors.map(el => el.message)
                res.redirect(`/register/doctor?error=${errorArr}`)
            } else {
                res.send(error)
            }
        }
    }

    static showRegisterPatient(req,res){
        try {
            let error = req.query.error?.split(`,`)
            res.render(`showRegisterPatient`,{error})
        } catch (error) {
            res.send(error)
        }
    }

    static async addPatient(req,res){
        try {
            const {username,password} = req.body
            let data = await User.create({username,password,role:`Patient`})

            const {name,gender,age,UserId,DoctorId,email} = req.body
            await Doctor.create({name,gender,age,UserId,DoctorId,email,status:`Pending`})

            res.redirect(`/login`)
        } catch (error) {
            if (error.name === `SequlizeValidationError`){
                let errorArr = error.errors.map(el => el.message)
                res.redirect(`/register/doctor?error=${errorArr}`)
            } else {
                res.send(error)
            }
        }
    }

}

module.exports = Controller