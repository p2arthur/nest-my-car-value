import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ReportModule } from './report/report.module';
import { User } from './users/users.entity';
import { Report } from './report/report.entity';
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['b30ak6v42w0'],
        }),
      )
      .forRoutes('*');
  }
}
