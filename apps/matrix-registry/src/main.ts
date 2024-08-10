/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {SERVICE_MATRIX_REGIStRY_PORT} from "@ascc";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = SERVICE_MATRIX_REGIStRY_PORT;

  const config = new DocumentBuilder()
    .setTitle('ASC NSLAI neko-docs Matrix Microservice')
    .setDescription('This api need for store matrix devices')
    .setVersion('1.0')
    .addTag('ASC NSLAI neko-docs Matrix')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
