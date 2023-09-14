import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

type emailOptions = {
  email: string;
  subject: string;
  message: string;
};

const sendEmail = async (options: emailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    service: process.env.SMTP_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mail = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(mail);

  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
