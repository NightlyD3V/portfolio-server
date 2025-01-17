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

  async function main(req) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: req.body.email,
          pass: process.env.EMAIL_PASS,
        },
      });
    // send mail with defined transport0 object
    const info = await transporter.sendMail({
    from: req.body.email, // sender address
    to: "Tylerspaulding95@gmail.com", // list of receivers
    subject: req.body.name, // Subject line
    text: req.body.message, // plain text body
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

