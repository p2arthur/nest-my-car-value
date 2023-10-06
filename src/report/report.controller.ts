import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dtos';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  postReport(@Body() body: CreateReportDto) {
    this.reportService.createReport(body.price, body.mileage);
  }
}
