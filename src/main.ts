import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
