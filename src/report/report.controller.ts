import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dtos';
import { ReportService } from './report.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/report')
@Serialize(UserDto)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('/session')
  getSession(@CurrentUser() currentUser: User) {
    return currentUser;
  }
  @UseGuards(AuthGuard)
  @Post()
  postReport(@CurrentUser() currentUser: User, @Body() body: CreateReportDto) {
    this.reportService.createReport(
      currentUser.id,
      body.price,
      body.make,
      body.model,
      body.year,
      body.latitude,
      body.longitude,
      body.mileage,
    );
  }
}
