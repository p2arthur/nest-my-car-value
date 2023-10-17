import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dtos';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  private report: Report;

  async createEstimate(estimateDto: GetEstimateDto) {
    try {
      console.log('querying');
      const queryResult = await this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make: estimateDto.make })
        .andWhere('model = :model', { model: estimateDto.model })
        .andWhere('longitude - :longitude BETWEEN -5 AND 5', {
          longitude: estimateDto.longitude,
        })
        .andWhere('latitude - :latitude BETWEEN -5 AND 5', {
          latitude: estimateDto.latitude,
        })
        .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year })
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage: estimateDto.mileage })
        .limit(3)
        .getRawOne();

      console.log('query result', queryResult);
      return queryResult;
    } catch (error) {
      console.error(error);
    }
  }

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
