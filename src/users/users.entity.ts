import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

import { Report } from 'src/report/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {}

  @AfterRemove()
  logDelete() {}

  @AfterUpdate()
  logUpdate() {}
}
