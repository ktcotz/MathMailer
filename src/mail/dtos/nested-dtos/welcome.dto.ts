import { IsNotEmpty, IsEmail } from 'class-validator';

export class WelcomeDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
