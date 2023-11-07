import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { PostCommentService } from './post-comment.service'
import { CreatePostCommentDto } from './dto/create-post-comment.dto'
import { PostIdParamDto } from '../../dto/post-id-param.dto'
import { PostCommentIdParamDto } from './dto/post-comment-id-param.dto'
import { IAuthUser, RequestWithUser } from '../../../../app.types'
import { UserGuard } from '../../../user-guard/user.guard'

@UseGuards(UserGuard)
@Controller()
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post()
  create(
    @Req() req: RequestWithUser<IAuthUser>,
    @Param() { post_id }: PostIdParamDto,
    @Body() { comment }: CreatePostCommentDto
  ) {
    return this.postCommentService.create(req.user.id, post_id, comment)
  }

  @Get()
  findAll(@Param() { post_id }: PostIdParamDto) {
    return this.postCommentService.findAll(post_id)
  }

  @Delete(':comment_id')
  remove(
    @Req() req: RequestWithUser<IAuthUser>,
    @Param() { post_id, comment_id }: PostIdParamDto & PostCommentIdParamDto
  ) {
    return this.postCommentService.remove(post_id, comment_id, req.user)
  }
}
