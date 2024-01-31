import nodemailer from "nodemailer";
import Mailgen from "mailgen";
async function sendMail(options) {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transpoter = nodemailer.createTransport(config);
  let mailGenerator = new Mailgen({
    theme: "Default",
    product: {
      name: "Peopely",
      link: `${process.env.FRONTEND_URL}/sing-up`,
      logo: "../assets/peopely.png",
      logoHeight: "30px",
    },
  });
  let email = {
    body: {
      name: options.name,
      intro:
        "Welcome to Peopely! We're very excited to have you on board. Please click the link to activate your account.",
      action: {
        instructions: "To get started with Peopely, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your account",
          link: options.activationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  let emailBody = mailGenerator.generate(email);
  let message = {
    from: process.env.EMAIL,
    to: options.email,
    subject: "Activate your account",
    html: emailBody,
  };

  transpoter.sendMail(message);
}
export default sendMail;
