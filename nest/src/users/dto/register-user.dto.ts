import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Length,
  NotContains,
} from 'class-validator';

export class RegisterUserDto {
  // @IsEmail()
  // @IsNotEmpty()
  // readonly email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @NotContains(' ')
  @Length(3, 20)
  readonly username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}
