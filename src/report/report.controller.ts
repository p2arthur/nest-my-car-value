import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dtos';
import { ReportService } from './report.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('/report')
@Serialize(ReportDto)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
    return query.make;
  }

  @Post()
  @UseGuards(AuthGuard)
  postReport(@CurrentUser() currentUser: User, @Body() body: CreateReportDto) {
    const report = this.reportService.createReport(body, currentUser);
    return report;
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    const report = await this.reportService.approveReport(id, body.approved);
    return report;
  }
}
