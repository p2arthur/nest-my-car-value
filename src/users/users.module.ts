import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';

import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
