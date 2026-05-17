const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT || 465),
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, // Gmail app password, not normal password
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendEmail = async (options) => {
  try {
    console.log(`Attempting to send email to: ${options.to}`);

    // Optional: run once at app startup, not every email
    // await transporter.verify();

    const mailOptions = {
      from: `Clarity Connect <${process.env.EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
