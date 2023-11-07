import { ForbiddenException, Injectable } from '@nestjs/common'
import { PostService } from '../../post.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { IAuthUser } from '../../../../app.types'

@Injectable()
export class PostCommentService {
  constructor(private readonly postService: PostService, private readonly prisma: PrismaService) {}

  async create(user_id: string, post_id: string, comment: string) {
    await this.postService.findOne(post_id)

    return this.prisma.postComment.create({
      data: {
        post_id: post_id,
        user_id: user_id,
        comment: comment,
      },
    })
  }

  async findAll(post_id: string) {
    const items = await this.prisma.postComment.findMany({
      where: {
        post_id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            is_admin: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return { items }
  }

  async remove(post_id: string, comment_id: string, user: IAuthUser) {
    const comment = await this.prisma.postComment.findFirst({
      where: {
        post_id,
        id: comment_id,
      },
    })

    if (!comment) return

    if (!user.is_admin && user.id !== comment.user_id) throw new ForbiddenException()

    await this.prisma.postComment.delete({
      where: {
        post_id: post_id,
        id: comment_id,
      },
    })

    return
  }
}
