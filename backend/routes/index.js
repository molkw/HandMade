const express = require('express');
const userSignUpController  = require('../controller/userSignUp');
const userSignInController = require('../controller/userSignin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const UploadProductController = require('../controller/uploadProduct');

const router = express.Router();


//authentification
router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details',authToken, userDetailsController);
router.get('/userLogout',userLogout);

//admin pannel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)


module.exports = router;