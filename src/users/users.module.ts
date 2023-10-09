import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UserModule {}
