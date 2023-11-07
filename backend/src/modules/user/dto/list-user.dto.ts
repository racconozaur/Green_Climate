import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'
import { Transform } from 'class-transformer'

export class ListUserDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsNotEmpty()
  readonly limit: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsNotEmpty()
  readonly page: number

  @IsString()
  @IsOptional()
  readonly username?: string
}
