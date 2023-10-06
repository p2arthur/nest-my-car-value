import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number): Promise<User> {
    const user = this.repo.findOneBy({ id });
    return user;
  }

  find(email: string): Promise<User[]> {
    const user = this.repo.find({ where: { email } });
    return user;
  }

  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async remove(id: number) {
    return id;
  }
}
