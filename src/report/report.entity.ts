import { User } from 'src/users/users.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  AfterUpdate,
  AfterInsert,
  AfterRemove,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  mileage: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports, { eager: true })
  user: User;

  @AfterUpdate()
  logUpdate() {}

  @AfterInsert()
  logInsert() {}

  @AfterRemove()
  logRemove() {}
}
