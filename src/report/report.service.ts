import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(
    creatorId: number,
    price: number,
    make: string,
    model: string,
    year: number,
    latitude: number,
    longitude: number,
    mileage: number,
  ) {
    const report = this.repo.create({
      creatorId,
      price,
      make,
      model,
      year,
      latitude,
      longitude,
      mileage,
    });
    this.repo.save(report);
  }
}
