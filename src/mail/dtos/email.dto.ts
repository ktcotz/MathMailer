import { IsEmail, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WelcomeDTO } from './nested-dtos/welcome.dto';
import { NotifyDTO } from './nested-dtos/notify.dto';
import { ResetDTO } from './nested-dtos/reset-dto';

export enum EmailTemplate {
  REGISTER = 'welcome',
  NOTIFY = 'notify',
  RESET = 'reset',
}

export class EmailDTO<T extends string> {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsEnum(EmailTemplate)
  @IsNotEmpty()
  template: EmailTemplate;

  @IsNotEmpty()
  @ValidateNested()
  @Type(({ object }) => {
    switch (object.template) {
      case 'welcome':
        return WelcomeDTO;
      case 'notify':
        return NotifyDTO;
      case 'reset':
        return ResetDTO;
      default:
        return Object;
    }
  })
  content: T extends 'welcome'
    ? WelcomeDTO
    : T extends 'reset'
      ? ResetDTO
      : NotifyDTO;
}
