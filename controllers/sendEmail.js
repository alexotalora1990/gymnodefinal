import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (email, subject, payload, templatePath) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const template = fs.readFileSync(path.resolve(templatePath), 'utf8');
    const emailContent = template.replace('{{link}}', payload.link);

    const mailOptions = {
      from: `"BODY CHAMPION  🏋️" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: emailContent,  
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: %s', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
