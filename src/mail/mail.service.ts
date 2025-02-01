import { Injectable } from '@nestjs/common';
import { EmailDTO } from './dtos/email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM_USER,
      pass: process.env.EMAIL_FROM_PASS,
    },
  });

  async sendEmail({ subject, to }: EmailDTO) {
    const mailOptions = {
      from: process.env.EMAIL_FROM_USER,
      to,
      subject,
      html: 'HI!',
    };

    return this.transporter.sendMail(mailOptions);
  }
}
