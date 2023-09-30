import { Expose } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class LoginUserDTO {
  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;
}

export class CreateUserDTO {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(5)
  password: string;

  @Expose()
  @IsString()
  @MinLength(5)
  @Match('password')
  passwordConfirm: string;
}

export class RefreshDTO {
  @Expose()
  @IsString()
  refreshToken: string;
}
