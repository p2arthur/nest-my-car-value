import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(creatorId: number, price: number, mileage: number) {
    console.log(creatorId, price, mileage);
    const report = this.repo.create({ creatorId, price, mileage });
    this.repo.save(report);
  }
}
