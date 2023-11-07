import { forwardRef, Module } from '@nestjs/common'
import { UserJwtModule } from '../user-jwt/user-jwt.module'
import { UserModule } from '../user/user.module'
import { UserAuthModule } from '../user-auth/user-auth.module'
import { UserAuthService } from '../user-auth/user-auth.service'
import { UserService } from '../user/user.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule, UserJwtModule, UserAuthModule, forwardRef(() => UserModule)],
  providers: [UserService, UserAuthService],
  exports: [UserService, UserAuthService],
})
export class UserGuardModule {}
