import { IsString } from 'class-validator';

export class InfoFacebookDto {
  @IsString()
  facebookId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  photo: string;
}
