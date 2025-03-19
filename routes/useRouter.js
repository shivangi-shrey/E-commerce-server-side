const useCtrl = require( '../controller/userCtrl')
const auth = require('../middleware/auth')
const refreshtokenCtrl = require('../controller/refreshTokenCtrl');
const loginCtrl = require('../controller/loginCtrl')
const logoutCtrl = require('../controller/logoutCtrl')
// ÷\const getUser = require ('../controller/getUserCtrl')
// const {getUser} = require ('../controller/getUserCtrl')
const getUserCtrl = require ('../controller/getUserCtrl')




const router = require('express').Router()


router.post('/register',useCtrl.register
);



router.post('/refresh_token', refreshtokenCtrl.refreshtoken);  // Use refreshtoken method from refreshTokenCtrl
router.post('/login',loginCtrl.login)
router.get('/logout',logoutCtrl.logout)
router.get('/infor',auth,getUserCtrl.getUser)
// Correct route definition
// router.get('/infor', auth, getUser); // This is correct






module.exports = router