import { Module } from '@nestjs/common'
import { PostCommentService } from './post-comment.service'
import { PostCommentController } from './post-comment.controller'
import { PrismaModule } from '../../../prisma/prisma.module'
import { UserGuardModule } from '../../../user-guard/user-guard.module'
import { PostModule } from '../../post.module'

@Module({
  imports: [PostModule, PrismaModule, UserGuardModule],
  controllers: [PostCommentController],
  providers: [PostCommentService],
  exports: [PostCommentService],
})
export class PostCommentModule {}
