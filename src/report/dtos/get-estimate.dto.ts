import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2030)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  latitude: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  longitude: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(10)
  @Max(1000000)
  mileage: number;
}
