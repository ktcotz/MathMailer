import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WelcomeDTO } from './nested-dtos/welcome.dto';
import { NotifyDTO } from './nested-dtos/notify.dto';

export enum EmailTemplate {
  REGISTER = 'welcome',
  NOTIFY = 'notify',
}

export class EmailDTO<T extends string> {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

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
      default:
        return Object;
    }
  })
  content: T extends 'welcome' ? WelcomeDTO : NotifyDTO;
}
