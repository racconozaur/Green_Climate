import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { UserJwtService } from '../user-jwt/user-jwt.service'
import { UserService } from '../user/user.service'
import { IAuthUser, RequestWithUser } from '../../app.types'
import { UserAuthService } from '../user-auth/user-auth.service'
import { Reflector } from '@nestjs/core'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: UserJwtService,
    private readonly userAuthService: UserAuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const check_if_is_admin = this.reflector.getAllAndOverride<boolean | null>('check_if_is_admin', [
      context.getHandler(),
      context.getClass(),
    ])

    const req: RequestWithUser<IAuthUser> = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(req)

    if (!token) {
      throw new UnauthorizedException()
    }

    const payload = await this.jwtService.customVerify(token)

    const session = await this.userAuthService.findSession(payload.jti)

    if (!session) throw new UnauthorizedException()

    const user = await this.userService.findOne(payload.id).catch(() => {
      throw new UnauthorizedException()
    })

    if (check_if_is_admin && !user.is_admin) throw new ForbiddenException()

    req.user = {
      ...user,
      jwt_id: payload.jti,
    }

    return true
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
