const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
// var config = JSON.parse(fs.readFileSync("config.json"));

var nodemailer = require('nodemailer');

let app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
})

app.post('/mail',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var emailId = req.body.emailid;
    var name = req.body.name;
    var sub = req.body.sub;
    var text = req.body.text;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: password,
        tls: {	
            rejectUnauthorized: false
        }
        }
    });

    var Email = emailId.split(",");
    
    let HelperOption = {
        from: name+'<'+email,
        to: Email,
        subject: sub,
        text: text
    }
    
    transporter.sendMail(HelperOption, (error, info) =>{
        if(error){
            return console.log(error);
          res.send('<h1>Email or password did not match<br> Please enter your gmailid and passowrd</h1>')
        } else {
            console.log("The message was sent ");
            console.log(info);
            res.sendFile(__dirname+'/views/index.html');
        }
    })
    
})


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
