import { Controller, Get } from '@nestjs/common';

@Controller('home')
export class AppController {
  @Get()
  getApp() {
    return 'Et from home';
  }
}
