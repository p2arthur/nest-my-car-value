import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
}
