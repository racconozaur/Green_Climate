import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { UserGuardModule } from '../user-guard/user-guard.module'

@Module({
  imports: [PrismaModule, UserGuardModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
