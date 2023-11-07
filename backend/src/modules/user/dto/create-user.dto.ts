import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly username: string

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly password: string
}
