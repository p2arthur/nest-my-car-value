import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(price: number, mileage: number) {
    const report = this.repo.create({ price, mileage });
    this.repo.save(report);
  }
}
