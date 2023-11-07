import { Module } from '@nestjs/common'
import { PostImageService } from './post-image.service'
import { PostImageController } from './post-image.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { PostModule } from '../../post.module'
import { PrismaModule } from '../../../prisma/prisma.module'
import { UserGuardModule } from '../../../user-guard/user-guard.module'

@Module({
  imports: [
    PostModule,
    PrismaModule,
    UserGuardModule,
    MulterModule.register({
      storage: diskStorage({
        destination: '../images',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname)
        },
      }),
    }),
  ],
  controllers: [PostImageController],
  providers: [PostImageService],
  exports: [PostImageService],
})
export class PostImageModule {}
