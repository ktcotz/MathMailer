import { Body, Controller, Post } from '@nestjs/common';
import { EmailDTO } from './dtos/email.dto';
import { MailService } from './mail.service';

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/')
  sendEmail<T extends string>(@Body() emailDTO: EmailDTO<T>) {
    return this.mailService.sendEmail(emailDTO);
  }
}
