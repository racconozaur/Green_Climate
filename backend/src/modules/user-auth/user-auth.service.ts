import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserLoginDto } from './dto/user-login.dto'
import { UserService } from '../user/user.service'
import { LoginException } from '../../exceptions/login.exception'
import * as bcrypt from 'bcryptjs'
import { UserJwtService } from '../user-jwt/user-jwt.service'

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: UserJwtService
  ) {}

  async generateSession(user_id: string) {
    const session = await this.prisma.userSession.create({
      data: {
        user_id: user_id,
      },
    })

    return this.jwtService.generateToken(user_id, session.id)
  }

  async login(data: UserLoginDto) {
    const user = await this.userService.findByUsername(data.username)

    if (!user) throw new LoginException()

    const is_password_valid = await bcrypt.compare(data.password, user.password)

    if (!is_password_valid) throw new LoginException()

    const token = await this.generateSession(user.id)

    delete user.password

    return {
      token,
      user,
    }
  }

  async register(data: UserLoginDto) {
    const user = await this.userService.create(data)

    const token = await this.generateSession(user.id)

    delete user.password

    return {
      token,
      user,
    }
  }

  async findSession(session_id: string) {
    return this.prisma.userSession.findUnique({
      where: {
        id: session_id,
      },
    })
  }
}
