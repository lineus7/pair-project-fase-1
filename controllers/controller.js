
const { User, Doctor, Patient } = require(`../models`)
const bcrypt = require('bcryptjs');
class Controller {

    static showHome(req, res) {
        res.render(`home`)
    }

    static showRegisterDoctor(req, res) {
        try {
            let error = req.query.error?.split(`,`)
            res.render(`showRegisterDoctor`, { error })
        } catch (error) {
            res.send(error)
        }
    }


    static async addDoctor(req, res) {
        try {
            const { username, password } = req.body
            let data = await User.create({ username, password, role: `Doctor` })

            const { name, sip, specialist, hospital, exp, price, email } = req.body
            // console.log(name, sip, specialist, hospital, exp, price);
            await Doctor.create({ name, sip, specialist, hospital, exp, price, email, UserId: data.id })

            res.redirect(`/login`)
        } catch (error) {
            if (error.name === `SequlizeValidationError`) {
                let errorArr = error.errors.map(el => el.message)
                res.redirect(`/register/doctor?error=${errorArr}`)
            } else {
                res.send(error)
            }
        }
    }

    static showRegisterPatient(req, res) {
        try {
            let error = req.query.error?.split(`,`)
            res.render(`showRegisterPatient`, { error })
        } catch (error) {
            res.send(error)
        }
    }

    static async addPatient(req, res) {
        try {
            const { username, password } = req.body
            let data = await User.create({ username, password, role: `Patient` })


            const { name, gender, age, email } = req.body
            await Patient.create({ name, gender, age, UserId: data.id, email, status: `Pending` })
            // console.log(username, password, name, gender, age, email);

            res.redirect(`/login`)
        } catch (error) {
            if (error.name === `SequlizeValidationError`) {
                let errorArr = error.errors.map(el => el.message)
                res.redirect(`/register/doctor?error=${errorArr}`)
            } else {
                res.send(error)
            }
        }
    }

    static async showLogin(req, res) {
        try {
            res.render(`showLogin`)
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body
            let data = await User.findOne({ where: username })
            if (data) {
                const isValidPassword = bcrypt.compareSync(password)
                if (isValidPassword) {
                    req.session.user = {
                        id: data.id,
                        role: data.role
                    }
                    if (data.role === "Patient") res.redirect(`/patient`)
                    if (data.role === "Doctor") res.redirect(`/doctor`)
                }
            }
        } catch (error) {
            res.send(error)
        }
    }



}

module.exports = Controller