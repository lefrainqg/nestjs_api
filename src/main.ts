import { NestFactory } from '@nestjs/core'
import { json } from 'express'
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common'

import { envs } from './config/envs'
import { AppModule } from './app.module'

async function bootstrap() {

   const logger = new Logger('Api Main')

   const app = await NestFactory.create(AppModule, {
      logger: new ConsoleLogger({
         json: false,
         colors: true,
      }),
      bodyParser: false,
   })

   app.use(json({ limit: '100mb' }))
   // app.setGlobalPrefix('api_v1')

   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
      })
   );

   app.enableCors()

   await app.listen(envs.port)
   logger.log(`Api is running on port: ${envs.port}`)

}
bootstrap()
