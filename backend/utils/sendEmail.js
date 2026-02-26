const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Initialize Transporter
    let transporter;

    // Use Environment variables if defined, otherwise fallback to Ethereal Test Credentials for dev
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    } else {
        // Fallback to auto-generated test Ethereal credentials
        console.log("No SMTP credentials found in .env. Falling back to Ethereal Test Credentials...");
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    }

    // 2) Define Mail Options
    const message = {
        from: `${process.env.FROM_NAME || 'Star Naming'} <${process.env.FROM_EMAIL || 'noreply@starnaming.example.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html, // Optional HTML Template
    };

    // 3) Send Mail
    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);

    // Log preview URL if using ethereal
    if (info.messageId && (!process.env.SMTP_HOST || process.env.SMTP_HOST.includes('ethereal'))) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};

module.exports = sendEmail;
