import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ReportModule } from './report/report.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/users.entity';
import { Report } from './report/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Users, Report],
      synchronize: true,
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
