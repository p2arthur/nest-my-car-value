import {
  IsInt,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsNumber,
} from 'class-validator';

export class CreateReportDto {
  @Min(1000)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2030)
  year: number;

  @IsNumber()
  @IsLatitude()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  longitude: number;

  @IsNumber()
  @Min(10)
  @Max(1000000)
  mileage: number;
}
