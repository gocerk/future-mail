const { createTransport } = require('nodemailer');
require('dotenv').config({path: require('find-config')('.env')});

const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true, 
    requireTLS: true,
    auth: {
        user: process.env.username,
        pass: process.env.password
    }
});

module.exports = {
    send: async ({ to, msg, writingDate, deliveryDate }) => {
        console.log(process.env.username, process.env.password);
        const mail = {
            to,
            from: process.env.username,
            subject: `Mail to yourself from ${writingDate}`,
            text: `From ${writingDate} to ${deliveryDate}, you have a message for yourself: \n${msg}`,
        }

        try {
            await transporter.sendMail(mail);
            return true; // for testing
        } catch(e) {
            console.log(e);
            return false; 
        }
    }
}