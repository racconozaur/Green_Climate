import { IsNotEmpty, IsUUID } from 'class-validator'

export class PostImageIdParamDto {
  @IsUUID(4)
  @IsNotEmpty()
  readonly post_image_id: string
}
