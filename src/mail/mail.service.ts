import { Injectable } from '@nestjs/common';
import { EmailDTO, EmailTemplate } from './dtos/email.dto';
import * as nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM_USER,
      pass: process.env.EMAIL_FROM_PASS,
    },
  });

  async sendEmail<T extends string>({ to, template, content }: EmailDTO<T>) {
    const subjects: Record<EmailTemplate, string> = {
      welcome: 'Rejestracja w aplikacji Mathey',
      reset: 'Zresetowanie hasła w aplikacji Mathey',
      notify: 'Powiadomienie',
    };

    const source = readFileSync(
      join(process.cwd(), 'src', 'mail', 'templates', `${template}.hbs`),
      'utf-8',
    );

    const compiledTemplate = Handlebars.compile(source);

    const html = compiledTemplate({
      ...content,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM_USER,
      to,
      subject: subjects[template],
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
