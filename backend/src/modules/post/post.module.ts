import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { UserGuardModule } from '../user-guard/user-guard.module'

@Module({
  imports: [PrismaModule, UserGuardModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
