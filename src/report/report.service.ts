import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dtos';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(reportDto: CreateReportDto) {
    const report = this.repo.create(reportDto);
    this.repo.save(report);
  }

  async getRepositorie(id: number) {
    const report = this.repo.findOneBy({ id });
    return report;
  }
}
