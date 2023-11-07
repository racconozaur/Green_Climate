import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UserAuthService } from './user-auth.service'
import { UserLoginDto } from './dto/user-login.dto'
import { UserGuard } from '../user-guard/user.guard'
import { IAuthUser, RequestWithUser } from '../../app.types'

@Controller('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @UseGuards(UserGuard)
  @Get('is-auth')
  async isAuth(@Req() req: RequestWithUser<IAuthUser>) {
    delete req.user.password
    delete req.user.jwt_id

    return req.user
  }

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return this.userAuthService.login(body)
  }

  @Post('register')
  async register(@Body() body: UserLoginDto) {
    return this.userAuthService.register(body)
  }
}
