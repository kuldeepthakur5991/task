const express = require('express')
const {registerController , loginController,testController}=require('../controller/authController')
// const requireSignIn = require('../middleware/authMidlleWare')

const router = express.Router()

// routing signup METHOD || POST

router.post('/register',registerController)

//login
router.post('/login',loginController)

// test routes
router.get('/test',testController)

module.exports = router