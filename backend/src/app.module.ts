import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'
import { PostImageModule } from './modules/post/modules/post-image/post-image.module'
import { PostCommentModule } from './modules/post/modules/post-comment/post-comment.module'
import { RouterModule } from '@nestjs/core'
import { PostRoutes } from './modules/post/post.routes'
import { UserAuthModule } from './modules/user-auth/user-auth.module'

@Module({
  imports: [
    UserAuthModule,
    UserModule,
    PostModule,
    PostImageModule,
    PostCommentModule,
    RouterModule.register([PostRoutes]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
