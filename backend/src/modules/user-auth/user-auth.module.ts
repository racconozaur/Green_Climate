import { forwardRef, Module } from '@nestjs/common'
import { UserAuthService } from './user-auth.service'
import { UserAuthController } from './user-auth.controller'
import { PrismaModule } from '../prisma/prisma.module'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule), JwtModule],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
