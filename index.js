import nodemailer from "nodemailer";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const corsOptions = {
    origin: 'https://nightlyd3v.github.io',  // Allow frontend from this origin
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "TylerSpaulding95@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });
  async function main(req) {
    // send mail with defined transport0 object
    const info = await transporter.sendMail({
    from: `<${req.body.email}>`, // sender address
    to: "Tylerspaulding95@gmail.com", // list of receivers
    subject: req.body.name, // Subject line
    text: `You received an email from ${req.body.name} with the following message: ${req.body.message}`, // plain text body
    });
}

app.post("/email", async (req, res) => {
    console.log("endpoint hit", req.body);
        // async..await is not allowed in global scope, must use a wrapper
        try {
            const result = await main(req).catch(console.error)
            res.status(200).send("Message sent! 🥰")
        } catch (error) {
            console.log(error);
        }
})

app.listen(3000, () => console.log("Listening on port 3000"))

