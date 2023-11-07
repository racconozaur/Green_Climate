import { IsNotEmpty, IsUUID } from 'class-validator'

export class PostIdParamDto {
  @IsUUID(4)
  @IsNotEmpty()
  readonly post_id: string
}
