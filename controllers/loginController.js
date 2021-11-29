var express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var router = express.Router();

var roleModal = require("../models/loginModel");

router.get('/', function(req, res) {
    res.render("login", {role: -1});
});

router.get('/change-password', function(req, res) {
    res.render("change_password", {role: -1});
});

router.post('/change-password', async function(req, res){

    password = req.body.OldPassword;
    account = req.body.Account;
    newpassword = req.body.NewPassword;
    confirmpassword = req.body.ConfirmPassword;

    if(newpassword != confirmpassword){
        res.render("change_password", {role: 1}); 
    }

    let data = await roleModal.getRole(account);    

    if (data){

        bcrypt.compare(password, data.Account_pass, function(err, result) {
            
            if (result) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newpassword, salt, function (err, hash) {
                        if (err)
                            console.log(err);
            
                        roleModal.updatePassword(account, hash)
                    });
                });
                res.render("login", {role: 'success'});
            }
            else{
                res.render("change_password", {role: 0});
            }  

        });

        // bcrypt.genSalt(10, function (err, salt) {
        //     bcrypt.hash(password, salt, function (err, hash) {
        //         if (err)
        //             console.log(err);
    
        //         password = hash;
        //         console.log(password);
        //     });
        // });
   
    }
    else{
        res.render("change_password", {role: 0});
    }
    
 });

router.post('/', async function(req, res){

    password = req.body.Password;
    account = req.body.Account;

    let data = await roleModal.getRole(account);    

    if (data){

        bcrypt.compare(password, data.Account_pass, function(err, result) {
            
            if (result) {

                if(data.Role == "user"){
                    req.session.User = {
                        mskh: req.body.Account,
                        role: 'user',
                    }
                    res.redirect("/home");
                }
    
                else if(data.Role == "employee"){
                    req.session.User = {
                        msnv: req.body.Account,
                        role: 'employee',
                    }
                    res.redirect("/employee/home");
                }
                
                else if (data.Role == "admin"){
                    req.session.User = {
                        admin: req.body.Account,
                        role: 'admin',
                    }
                    res.redirect("/admin/home");
                }
        
                else{
                    req.session.User = {
                        msdn: req.body.Account,
                        role: 'supplier',
                    }
                    res.redirect("supplier/home");
                }
            }
            else{
                res.render("login", {role: 0});
            }  

        });

        // bcrypt.genSalt(10, function (err, salt) {
        //     bcrypt.hash(password, salt, function (err, hash) {
        //         if (err)
        //             console.log(err);
    
        //         password = hash;
        //         console.log(password);
        //     });
        // });
   
    }
    else{
        res.render("login", {role: 0});
    }
    
 });

module.exports = router;