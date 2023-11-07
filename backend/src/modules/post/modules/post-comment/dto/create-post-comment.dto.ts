import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePostCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string
}
