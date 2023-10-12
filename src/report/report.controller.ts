import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dtos';
import { ReportService } from './report.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportDto } from './dtos/report.dto';

@Controller('/report')
@Serialize(ReportDto)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(AuthGuard)
  @Post()
  postReport(@CurrentUser() currentUser: User, @Body() body: CreateReportDto) {
    const report = this.reportService.createReport(body, currentUser);
    return report;
  }

  @Get('/:id')
  async getReportById(@Param('id') id: number) {
    const report = await this.reportService.getRepositorie(id);
    return report;
  }
}
