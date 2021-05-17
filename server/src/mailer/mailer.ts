import { MAILER_EMAIL, MAILER_HOST, MAILER_PORT, MAILER_PASSWORD } from './../secrets';
import { createTransport, getTestMessageUrl } from "nodemailer";

export async function sendMail(from: string, to: string, subject: string, text: string, htmlText?: string){
  const transporter = createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: MAILER_EMAIL,
      pass: MAILER_PASSWORD,
    }
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: htmlText
  });

  console.log("Preview url", getTestMessageUrl(info));
}
