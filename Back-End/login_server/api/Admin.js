const express = require('express');
const router = express.Router();

// mongodb Admin model
const Admin = require('./../models/Admin');

// email handler
const nodemailer = require("nodemailer");

//unique string
const {v4: uuidv4} = require("uuid");

// env variables
require("dotenv").config();

//Password handler
const bcrypt = require('bcrypt');

// path for static verified page
const path = require('path');



// Nodemailer stuff
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        //type: "OAuth2",
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
        //clientId: process.env.AUTH_CLIENT_ID,
        //clientSecret: process.env.AUTH_CLIENT_SECRET,
        //refreshToken: process.env.AUTH_REFRESH_TOKEN,
    },
});

//testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else{
        console.log("Ready for message");
        console.log(success);
    }
});

// setting server url
const development = "http://localhost:5000/";
const production = "https://bike-sharing-22.herokuapp.com/";
const currentUrl = process.env.NODE_ENV ? production : development;

// Signup
router.post('/signup', (req, res) => {
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if(name == "" || email == "" || password == "" || dateOfBirth == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }else if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    }else if (!new Date(dateOfBirth).getTime()){
        res.json({
            status: "FAILED",
            message: "Invalid date of birth entered"
        })
    }else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is to short!"
        })
    }else {
        // Checking if Admin already exists
        Admin.find({email}).then(result => {
            if(result.length){
                //A Admin already exist
                res.json({
                    status: "FAILED",
                    message: "Admin with the provided email already exists"
                })
            } else{
                // Try to create new Admin

                // password handling
                const saltRounds = 10;
                bcrypt
                    .hash(password, saltRounds)
                    .then(hashedPassword => {
                        const  newAdmin = new Admin({
                            name,
                            email,
                            password: hashedPassword,
                            dateOfBirth
                        });

                        newAdmin
                            .save()
                            .then((result) => {
                            // Handle account verification
                            res.json({
                                status: "SUCCESS",
                                message: "Signup successful!",
                                data: result,
                            });
                        })
                        .catch((err) =>{
                            console.log(err);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while saving Admin account!"
                            });
                        });
                    })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing password!"
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing Admin!"
            });
        });
    }
});


// Signin
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        })
    }else {
        // Check if Admin exist
        Admin.find({email})
        .then(data => {
            if (data.length) {
                //Admin exists

                
                    const hashedPassword = data[0].password;
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if(result){
                            // Password match
                            res.json({
                                status: "SUCCESS",
                                message: "Signin successful",
                                data: data
                            })
                        } else {
                            res.json({
                                status: "FAILED",
                                message: "Invalid password entered!"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while comparing passwords"
                        });
                    });
            }else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                })
            }
        })
        .catch(err => {  
            console.log(err);                
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user"
            })
        })
    }
})

module.exports = router;