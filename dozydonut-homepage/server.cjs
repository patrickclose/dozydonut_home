import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

app.post('/api/contact', (req, res) => {
    const { firstName, lastName, workEmail, businessPhone, companyWebsite, businessChallenges } = req.body;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: 'contact@dozydonut.com',
        subject: 'New Contact Form Submission',
        text: `First Name: ${firstName}\nLast Name: ${lastName}\nWork Email: ${workEmail}\nBusiness Phone: ${businessPhone}\nCompany Website: ${companyWebsite}\nBusiness Challenges: ${businessChallenges}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
