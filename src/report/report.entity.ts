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
  price: number;

  @Column()
  mileage: number;

  @AfterUpdate()
  logUpdate() {
    console.log('Updated report with id:', this.id);
  }

  @AfterInsert()
  logInsert() {
    console.log('Inserted report with id:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed report with id:', this.id);
  }
}
