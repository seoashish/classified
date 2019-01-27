const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
      user: 'seoashishkerketta@gmail.com',
      pass: 'event999'
  }
});


const sendMail = function(dataObject, done){
  
  let mailOptions = {
    from: '"Ashish Kerketta" <seoashishkerketta@gmail.com>', // sender address
    to: dataObject.to, // list of receivers
    subject: dataObject.subject, // Subject line
    //text: 'That was easy!', // plain text body
    html: dataObject.html // html body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        done(error);
    }
    console.log('MessageId %s : ', info.messageId);
    console.log('Envelope %s : ', info.envelope);
    //console.log('Accepted %s : ', info.accepted);
    //console.log('Rejected %s : ', info.rejected);
    //console.log('Pending %s : ', info.pending);
    console.log('Response %s : ', info.response);
    });
  
};


const confirmHtml = function(email, token){
  let html = `<h1>Confirmation Message</h1>
              <a href="http://localhost:3000/u/confirm/${email}/${token}">Confirm now</a>`;
  return html;

}

exports.sendMail = sendMail;
exports.confirmHtml = confirmHtml;