/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Path, UPDATE_SERVICE, UpdateLogAPI } from '@em-test/common';
import { SwaggerModule } from '@nestjs/swagger';
import { RmqService } from '@em-test/rabbitmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get(RmqService);
  const globalPrefix = 'api';

  app.connectMicroservice(rmqService.getOptions(UPDATE_SERVICE));

  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, UpdateLogAPI.Config);

  SwaggerModule.setup(Path.Spec, app, document);

  const port = process.env.UPDATE_LOG_PORT;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(
    `🚀 User update log app is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
