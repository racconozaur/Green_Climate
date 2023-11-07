import { Global, Module } from '@nestjs/common'
import { UserJwtService } from './user-jwt.service'

@Global()
@Module({
  providers: [UserJwtService],
  exports: [UserJwtService],
})
export class UserJwtModule {}
