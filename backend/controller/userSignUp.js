const { response } = require("express");

async function userSignUpController(req,res){
    try{

    }catch(err){
     response.json({
        message : err,
        error : true,
        success : false,
     })  
    }
}