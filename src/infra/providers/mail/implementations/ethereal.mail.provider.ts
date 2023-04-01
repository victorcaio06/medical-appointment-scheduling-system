import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, MailDTO } from "../mail.provider";

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "arlene.breitenberg@ethereal.email",
            pass: "5EHt9Pf78Z2naHAbHd",
          },
        });

        this.client = transporter;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendEmail(data: MailDTO): Promise<void> {
    const resultMail = await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log("Message send: %s", resultMail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(resultMail));
  }
}
