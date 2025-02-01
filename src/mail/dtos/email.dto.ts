import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum EmailTemplate {
  Register = 'REGISTER',
}

export class EmailDTO {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsEnum(EmailTemplate)
  @IsNotEmpty()
  template: EmailTemplate;
}
