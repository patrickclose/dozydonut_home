// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
        return;
    }

    const { firstName, lastName, workEmail, businessPhone, companyWebsite, businessChallenges } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send email to the same address
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission from ${firstName} ${lastName}.\n\nEmail: ${workEmail}\nPhone: ${businessPhone}\nWebsite: ${companyWebsite}\n\nBusiness Challenges:\n${businessChallenges}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to send email.', error: error.message });
    }
}
