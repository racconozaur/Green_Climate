import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { PostImageService } from './post-image.service'
import { UpdatePostImageOrderDto } from './dto/update-post-image-order.dto'
import { PostIdParamDto } from '../../dto/post-id-param.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { PostImageIdParamDto } from './dto/post-image-id-param.dto'
import { UserGuard } from '../../../user-guard/user.guard'

@UseGuards(UserGuard)
@Controller()
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(@Param() { post_id }: PostIdParamDto, @UploadedFiles() files: Express.Multer.File[]) {
    return this.postImageService.create(post_id, files)
  }

  @Get()
  findAll(@Param() { post_id }: PostIdParamDto) {
    return this.postImageService.findAll(post_id)
  }

  @Patch()
  updateOrder(@Param() { post_id }: PostIdParamDto, @Body() data: UpdatePostImageOrderDto) {
    return this.postImageService.updateOrder(post_id, data)
  }

  @Delete(':post_image_id')
  remove(@Param() { post_id, post_image_id }: PostIdParamDto & PostImageIdParamDto) {
    return this.postImageService.remove(post_id, post_image_id)
  }
}
