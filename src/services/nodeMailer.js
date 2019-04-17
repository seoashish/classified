const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
	host: 'smtp.elasticemail.com',
	port: 2525,
	secure: false,
  auth: {
      user: 'jharkhandclassified@gmail.com',
      pass: '9d021bed-f0fc-4672-9bd3-c905c6aa97a6'
  }
});


const sendMail = function(dataObject, done){
  
  let mailOptions = {
    from: '"Jharkhand Classified" <jharkhandclassified@gmail.com>', // sender address
    to: dataObject.to, // list of receivers
    subject: dataObject.subject, // Subject line
    //text: 'That was easy!', // plain text body
    html: dataObject.html // html body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        done(error);
    }
    console.log('MessageId : ', info);
    //console.log('Envelope %s : ', info.envelope);
    //console.log('Accepted %s : ', info.accepted);
    //console.log('Rejected %s : ', info.rejected);
    //console.log('Pending %s : ', info.pending);
    //console.log('Response %s : ', info.response);
    });
  
};


const confirmHtml = function(email, token){
  let html = `<p>Confirm your email address to complete your registration. It's easy - just click the button below.</p>
              <a href="https://www.jharkhandclassified.com/u/confirm/${email}/${token}">Confirm now</a>`;
  return html;

};

const resetHtml = function(email, token){
  let html = `<p>To reset password follow instruction. It's easy - just click the button below.</p>
              <a href="https://www.jharkhandclassified.com/u/reset/${email}/${token}">Confirm now</a>`;
  return html;

};

exports.sendMail = sendMail;
exports.resetHtml = resetHtml;
exports.confirmHtml = confirmHtml;
