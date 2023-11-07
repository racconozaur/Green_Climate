import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super()
  }

  get extended() {
    return this.$extends({
      model: {
        $allModels: {
          findManyAndCount<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
          ): Promise<[Prisma.Result<T, A, 'findMany'>, number]> {
            return Promise.all([(this as any).findMany(args), (this as any).count({ where: (args as any).where })])
          },
        },
      },
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}
