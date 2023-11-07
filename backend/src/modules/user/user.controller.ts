import { Body, Controller, Get, Param, Post, Query, SetMetadata, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UserIdParamDto } from './dto/user-id-param.dto'
import { ListUserDto } from './dto/list-user.dto'
import { UserGuard } from '../user-guard/user.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SetMetadata('check_if_is_admin', true)
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  findAll(@Query() query: ListUserDto) {
    return this.userService.findAll(query)
  }

  @Get(':user_id')
  findOne(@Param() { user_id }: UserIdParamDto) {
    return this.userService.findOne(user_id)
  }
}
