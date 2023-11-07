import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@em-test/prisma';
import { RmqModule } from '@em-test/rabbitmq';
import { UPDATE_SERVICE } from '@em-test/common';

@Module({
  imports: [
    PrismaModule,
      RmqModule.register({
        name: UPDATE_SERVICE,
    })
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
