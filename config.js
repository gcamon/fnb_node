const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require("express-session");

const config = (app) => {
    
    app.use('/assets', express.static(__dirname + '/public'));

    app.use(session({
        secret: 'keyboard cat',
        //store: store,
        resave: true,	  
        saveUninitialized: true,
        cookie: {
            httpOnly: true, 
            maxAge: 3600000 * 24, // 24 hours
            path: "/"
        } 
    }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: "40mb"}));

    app.engine(".html", require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views')
}

module.exports = config;