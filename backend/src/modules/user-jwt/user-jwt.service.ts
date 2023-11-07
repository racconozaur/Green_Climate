import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import Configuration from '../../config/configuration'
import { JwtPayload } from 'jsonwebtoken'

@Injectable()
export class UserJwtService extends JwtService {
  constructor() {
    super({
      secret: Configuration.USER_JWT_SECRET,
    })
  }

  async generateToken(user_id: string, jwt_id: string) {
    return this.signAsync(
      {
        id: user_id,
      },
      {
        jwtid: jwt_id,
      }
    )
  }

  async customVerify(token: string): Promise<JwtPayload> {
    const payload: JwtPayload = await this.verifyAsync(token).catch(() => {
      throw new UnauthorizedException()
    })

    if (!payload.jti) throw new UnauthorizedException()

    return payload
  }
}
