import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  longitude: number;

  @Expose()
  latitude: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user?.id)
  @Expose()
  userId: number;

  @Transform(({ obj }) => obj.user?.email)
  @Expose()
  user_email: number;
}
