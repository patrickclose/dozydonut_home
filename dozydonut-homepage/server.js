const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
require('dotenv').config();


app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, workEmail, businessPhone, companyWebsite, businessChallenges } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER, // Replace with your email
            pass: process.env.GMAIL_PASS, // Replace with your email password
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: 'contact@dozydonut.com',
        subject: `New Contact Form Submission - ${firstName} ${lastName}`,
        text: `
            First Name: ${firstName}
            Last Name: ${lastName}
            Work Email: ${workEmail}
            Business Phone: ${businessPhone}
            Company Website: ${companyWebsite}
            Business Challenges: ${businessChallenges}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
