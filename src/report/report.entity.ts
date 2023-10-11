import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  AfterUpdate,
  AfterInsert,
  AfterRemove,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: number;

  @Column()
  price: number;

  @Column()
  mileage: number;

  @AfterUpdate()
  logUpdate() {}

  @AfterInsert()
  logInsert() {}

  @AfterRemove()
  logRemove() {}
}
