const nodemailer = require('nodemailer');
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Get the user's IP address from ipify
        const response = await axios.get('https://api.ipify.org?format=json');
        const ip = response.data.ip;
        console.log("User's IP Address:", ip); // Log the IP address

        // Set up Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Your email password or App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'nguyenpham0806@gmail.com', // Replace with your email
            subject: 'New IP Address',
            text: `User's IP Address: ${ip}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'IP Address sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send IP address.' });
    }
};
