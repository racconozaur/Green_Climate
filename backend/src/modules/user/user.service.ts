import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcryptjs'
import Configuration from '../../config/configuration'
import { ListUserDto } from './dto/list-user.dto'
import { AlreadyExistsException } from '../../exceptions/alreadyExists.exception'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    })
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.findByUsername(data.username)

    if (existingUser) throw new AlreadyExistsException()

    const hashed_password = await bcrypt.hash(data.password, Configuration.SALT_ROUND)

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        password: hashed_password,
      },
    })

    delete user.password

    return user
  }

  async findAll(data: ListUserDto) {
    const search: any = data.username ? { contains: data.username, mode: 'insensitive' } : undefined

    const [items, count] = await this.prisma.extended.user.findManyAndCount({
      where: {
        ...(search ? { username: search } : {}),
      },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    })

    items.forEach((item) => {
      delete item.password
    })

    return { count, items }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    if (!user) throw new NotFoundException('User')

    delete user.password

    return user
  }

  async remove(id: string) {
    const user = await this.findOne(id)

    if (user.is_admin) throw new BadRequestException()

    await this.prisma.user.delete({
      where: { id },
    })

    return
  }
}
