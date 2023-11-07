import { IsNotEmpty, IsUUID } from 'class-validator'

export class UserIdParamDto {
  @IsUUID(4)
  @IsNotEmpty()
  readonly user_id: string
}
