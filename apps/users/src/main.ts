/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { Path, UsersAPI } from '@em-test/common';
import { CreateUserDto } from './app/user/dto/create-user.dto';
import { UpdateUserDto } from './app/user/dto/update-user.dto';
import { UserRdo } from './app/user/rdo/user.rdo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const document = SwaggerModule.createDocument(app, UsersAPI.Config, { extraModels: [CreateUserDto, UpdateUserDto, UserRdo] } );

  SwaggerModule.setup(Path.Spec, app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
