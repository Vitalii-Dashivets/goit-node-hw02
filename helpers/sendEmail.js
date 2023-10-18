import nodemailer from "nodemailer";

const sendEmail = (emailOptions) => {
  const { EMAIL_PASSWORD } = process.env;
  const config = {
    host: "smtp.i.ua",
    port: 465,
    secure: true,
    auth: {
      user: "vetal_d@i.ua",
      pass: EMAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  return transporter.sendMail({ from: "vetal_d@i.ua", ...emailOptions });
};

export { sendEmail };
