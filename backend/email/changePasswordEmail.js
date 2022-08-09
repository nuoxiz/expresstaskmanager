require("dotenv").config();
const nodemailer = require("nodemailer");

const userEmail = process.env.EMAIL;
const password = process.env.PASSWORD;

console.log("email: " + userEmail);
console.log("password: " + password);
//transport has the sender information for authentication
const transport = nodemailer.createTransport({

  host: "smtp.office365.com",
  port: 587,
  service: "hotmail",
  auth: {
    user: userEmail,
    pass: password,
  },
});

const sendChangePasswordEmail = (name, email, userId) => {
    console.log("email: " + userEmail);
    console.log("password: " + password);
    console.log("email is called")
    transport.sendMail(
    {
      from: userEmail,
      to: email,
      subject: "Change Your Password",
      html: `<div>
    <h1>Change Your Password</h1>
    <h2> Hello ${name} </h2>
    <p>Please change your password by clicking on the following link:</p>
    <a href=https://expresstaskmanager.herokuapp.com/changePassword/${userId}>Click here</a>
    </div>`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(info);
    }
  );
};
module.exports = {
  sendChangePasswordEmail,
};
