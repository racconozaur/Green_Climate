import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostIdParamDto } from './dto/post-id-param.dto'
import { IAuthUser, RequestWithUser } from '../../app.types'
import { UserGuard } from '../user-guard/user.guard'
import { ListPostDto } from './dto/list-post.dto'

@UseGuards(UserGuard)
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Req() req: RequestWithUser<IAuthUser>, @Body() data: CreatePostDto) {
    return this.postService.create(req.user.id, data)
  }

  @Get()
  async findAll(@Query() query: ListPostDto) {
    return this.postService.findAll(query)
  }

  @Get(':post_id')
  async findOne(@Param() { post_id }: PostIdParamDto) {
    return this.postService.findOne(post_id)
  }

  @Patch(':post_id')
  async update(
    @Req() req: RequestWithUser<IAuthUser>,
    @Param() { post_id }: PostIdParamDto,
    @Body() data: UpdatePostDto
  ) {
    return this.postService.update(post_id, req.user, data)
  }

  @Delete(':post_id')
  async remove(@Req() req: RequestWithUser<IAuthUser>, @Param() { post_id }: PostIdParamDto) {
    return this.postService.remove(post_id, req.user)
  }
}
