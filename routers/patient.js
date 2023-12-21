const express = require('express')
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
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router