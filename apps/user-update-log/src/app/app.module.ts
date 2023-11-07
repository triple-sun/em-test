import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserUpdateModule } from './user-update/user-update.module'
import { appConfigModuleOptions } from '@em-test/common';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigModuleOptions),
    UserUpdateModule,
  ],
})
export class AppModule {}
