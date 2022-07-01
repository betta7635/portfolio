const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  provider: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'saraegreer@icloud.com', // Enter here email address from which you want to send emails
    pass: 'InTheClouds2019' // Enter here password for email account from which you want to send emails
  },
  tls: {
  rejectUnauthorized: false
  }
});

// serve static build files from the dist directory
app.use(express.static('./dist/portfolio'));

// app.use(bodyParser.json());

// to be used in dev environment only!!
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// route incoming server requests to the correct files
app.get('/*', (req, res) =>
  res.sendFile('index.html', { root: 'dist/portfolio/' })
);

app.post('/send', function (req, res) {
  let senderName = req.body.contactName;
  let senderEmail = req.body.contactEmail;
  let messageText = req.body.contactMessage;
  let copyToSender = req.body.contactCopy;

  let mailOptions = {
    to: ['saraegreer@icloud.com'], // Enter here the email address on which you want to send emails from your customers
    from: senderName,
    subject: messageSubject,
    text: messageText,
    replyTo: senderEmail
  };

  if (senderName === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (senderEmail === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (messageSubject === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (messageText === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }

  if (copyToSender) {
    mailOptions.to.push(senderEmail);
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

// start the app on the default heroku port
app.listen(process.env.PORT || 8080);

// app.listen(port, function () {
//   console.log('Express started on port: ', port);
// });
