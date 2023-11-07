import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { appConfigModuleOptions } from '@em-test/common';

@Module({
  imports: [
    ConfigModule.forRoot(appConfigModuleOptions),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
