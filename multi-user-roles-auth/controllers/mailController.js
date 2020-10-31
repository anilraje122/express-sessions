const nodemailer = require("nodemailer");
const config = require("../config/default.json");

const userMail = async (email, subject, html) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.in",
        port: 587,
        secure: false,
        auth: {
            user: config.USERNAME,
            pass: config.PASSWORD,
        }
    });

    let info = await transporter.sendMail({
        from: '"Anil Raj Space Solutions 👻" <admin@anilraj.space>',
        to: email,
        subject: subject,
        html: html,
    });
    console.log("Message sent: %s", info.messageId);
};

module.exports = userMail;