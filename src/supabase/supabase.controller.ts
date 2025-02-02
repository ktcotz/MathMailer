import { Body, Controller, Post } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { MailService } from 'src/mail/mail.service';
import { EmailTemplate } from 'src/mail/dtos/email.dto';

@Controller('reset')
export class SupabaseController {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly mailService: MailService,
  ) {}

  @Post('/')
  async resetPassword(@Body('email') email: string) {
    const { message, link } = await this.supabaseService.generateResetLink({
      email,
    });

    if (message !== 'ok') return;

    this.mailService.sendEmail<EmailTemplate.RESET>({
      to: email,
      template: EmailTemplate.RESET,
      content: { link },
    });
  }
}
