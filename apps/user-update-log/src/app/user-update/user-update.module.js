import { Module } from '@nestjs/common';
import { UserUpdateService } from './user-update.service';
import { UserUpdateController } from './user-update.controller';
import { PrismaModule } from '@em-test/prisma';
import { UserUpdateRepository } from './user-update.repository';
import { RmqModule } from '@em-test/rabbitmq'

@Module({
  imports: [
    PrismaModule,
    RmqModule
  ],
  controllers: [UserUpdateController],
  providers: [UserUpdateService, UserUpdateRepository],
  exports: [UserUpdateService, UserUpdateRepository],
})
export class UserUpdateModule {}
