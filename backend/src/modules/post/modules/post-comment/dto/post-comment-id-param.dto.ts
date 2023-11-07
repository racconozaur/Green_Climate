import { IsNotEmpty, IsUUID } from 'class-validator'

export class PostCommentIdParamDto {
  @IsUUID(4)
  @IsNotEmpty()
  readonly comment_id: string
}
