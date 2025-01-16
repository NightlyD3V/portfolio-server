import nodemailer from "nodemailer";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "TylerSpaulding95@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

const app = express();
app.listen(3000, () => console.log("Listening on port 3000"));

app.get("/", (req, res) => {
    res.send("Attempting to send message...");
        // async..await is not allowed in global scope, must use a wrapper
    async function main(req) {
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: `<${req.email}>`, // sender address
        to: "Tylerspaulding95@gmail.com", // list of receivers
        subject: req.subject, // Subject line
        text: req.text, // plain text body
        });
    
        console.log("Message sent: %s", info.messageId);
        res.send("Message sent: %s", info.messageId);
    }
    
    main().catch(console.error);
})

