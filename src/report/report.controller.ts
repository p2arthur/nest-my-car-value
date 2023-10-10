import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dtos';
import { ReportService } from './report.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('/report')
@Serialize(UserDto)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('/session')
  getSession(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Post()
  postReport(@CurrentUser() currentUser: User, @Body() body: CreateReportDto) {
    console.log(currentUser);
    if (!currentUser) {
      throw new ForbiddenException('Login to post a user');
    }

    this.reportService.createReport(currentUser.id, body.price, body.mileage);
  }
}
