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
  logInsert() {}

  @AfterRemove()
  logDelete() {}

  @AfterUpdate()
  logUpdate() {}
}
