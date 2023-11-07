import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from '../prisma/prisma.service'
import Configuration from '../../config/configuration'
import { ItemNotFoundException } from '../../exceptions/notFound.exception'
import { IAuthUser } from '../../app.types'
import { ListPostDto } from './dto/list-post.dto'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: string, data: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        user_id: user_id,
        title: data.title,
        body: data.body,
      },
    })

    return this.findOne(post.id)
  }

  async findAll(data: ListPostDto) {
    const search: any = data.title ? { contains: data.title, mode: 'insensitive' } : undefined

    const [items, count] = await this.prisma.extended.post.findManyAndCount({
      where: {
        ...(search ? { title: search } : {}),
      },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            is_admin: true,
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    items.forEach((item) => {
      item.images.forEach((image) => {
        image.name = `${Configuration.IMAGE_URL}/${image.name}`
      })
    })

    return { count, items }
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            is_admin: true,
          },
        },
        images: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    if (!post) throw new ItemNotFoundException('Post')

    post.images.forEach((image) => {
      image.name = `${Configuration.IMAGE_URL}/${image.name}`
    })

    return post
  }

  async update(post_id: string, user: IAuthUser, data: UpdatePostDto) {
    const post = await this.findOne(post_id)

    if (!user.is_admin && user.id !== post.user_id) throw new ForbiddenException()

    await this.prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        title: data.title || undefined,
        body: data.body || undefined,
      },
    })

    return this.findOne(post_id)
  }

  async remove(post_id: string, user: IAuthUser) {
    const post = await this.findOne(post_id)

    if (!user.is_admin && user.id !== post.user_id) throw new ForbiddenException()

    await this.prisma.post.delete({
      where: {
        id: post_id,
      },
    })

    return
  }
}
