import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';

async function bootstrap() {
  const app = await NestFactory.create([UserModule, ReportModule]);
  await app.listen(3000);
}
bootstrap();
