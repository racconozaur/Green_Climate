import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CustomValidationPipe } from './pipes/custom-validation.pipe'
import * as path from 'path'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  })

  app.use('/images', express.static(path.join(path.resolve(), '..', 'images')))

  app.useGlobalPipes(CustomValidationPipe)

  await app.listen(3000)
}
bootstrap()
