import * as dotenv from 'dotenv';
dotenv.config(); // ✅ MUST be first

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Zod validation
  app.useGlobalPipes(new ZodValidationPipe());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
