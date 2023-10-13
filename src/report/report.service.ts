import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dtos';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  private report: Report;

  async createReport(reportDto: CreateReportDto, user: User) {
    const reportInstance = this.repo.create(reportDto);
    reportInstance.user = user;
    this.report = await this.repo.save(reportInstance);
    return this.report;
  }

  async getReport(id: string) {
    const parsedId = parseInt(id);
    const report = await this.repo.findOneBy({ id: parsedId });
    return report;
  }

  @Serialize(ReportDto)
  async approveReport(id: string, approved: boolean) {
    const reportInstance = await this.getReport(id);

    if (!reportInstance) {
      throw new NotFoundException('Report not found');
    }

    reportInstance.approved = approved;

    this.report = await this.repo.save(reportInstance);

    return this.report;
  }
}
