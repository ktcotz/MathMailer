import { IsNotEmpty, IsString } from 'class-validator';

export class ResetDTO {
  @IsString()
  @IsNotEmpty()
  link: string;
}
