import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mileage: number;

  @Column()
  price: number;
}
