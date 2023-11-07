import { Injectable } from '@nestjs/common'
import { UpdatePostImageOrderDto } from './dto/update-post-image-order.dto'
import { PrismaService } from '../../../prisma/prisma.service'
import { PostService } from '../../post.service'
import Configuration from '../../../../config/configuration'

@Injectable()
export class PostImageService {
  constructor(private readonly postService: PostService, private readonly prisma: PrismaService) {}

  async create(post_id: string, files: Array<Express.Multer.File>) {
    await this.postService.findOne(post_id)

    const count = await this.prisma.postImage.aggregate({
      where: {
        post_id,
      },
      _max: {
        order: true,
      },
    })

    let order = count._max.order

    await this.prisma.postImage.createMany({
      data: files.map((file) => {
        order++

        return {
          order: order,
          post_id: post_id,
          name: file.filename,
        }
      }),
      skipDuplicates: true,
    })

    return this.findAll(post_id)
  }

  async findAll(post_id: string) {
    const images = await this.prisma.postImage.findMany({
      where: {
        post_id: post_id,
      },
      orderBy: {
        order: 'asc',
      },
    })

    images.forEach((image) => {
      image.name = `${Configuration.IMAGE_URL}/${image.name}`
    })

    return {
      images,
    }
  }

  async updateOrder(post_id: string, data: UpdatePostImageOrderDto) {
    await this.postService.findOne(post_id)

    const to_update = []

    for (const image of data.items) {
      to_update.push(
        this.prisma.postImage.update({
          where: {
            id: image.id,
            post_id: post_id,
          },
          data: {
            order: image.order,
          },
        })
      )
    }

    await Promise.all(to_update)

    return this.findAll(post_id)
  }

  async remove(post_id: string, image_id: string) {
    await this.prisma.postImage.delete({
      where: {
        id: image_id,
        post_id: post_id,
      },
    })

    return
  }
}
