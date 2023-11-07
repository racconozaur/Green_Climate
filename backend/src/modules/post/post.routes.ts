import { RouteTree } from '@nestjs/core/router/interfaces/routes.interface'
import { PostModule } from './post.module'
import { PostCommentModule } from './modules/post-comment/post-comment.module'
import { PostImageModule } from './modules/post-image/post-image.module'

export const PostRoutes: RouteTree = {
  module: PostModule,
  path: 'post',
  children: [
    {
      module: PostCommentModule,
      path: ':post_id/comment',
      children: [],
    },
    {
      module: PostImageModule,
      path: ':post_id/image',
      children: [],
    },
  ],
}
