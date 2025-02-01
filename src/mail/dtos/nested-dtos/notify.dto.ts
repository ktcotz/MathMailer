import { IsNotEmpty, IsString } from 'class-validator';

export class NotifyDTO {
  @IsString()
  @IsNotEmpty()
  test: string;
}
