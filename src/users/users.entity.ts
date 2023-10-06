import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id:', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('Removed user with id:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id:', this.id);
  }
}
