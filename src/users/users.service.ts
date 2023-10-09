import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: string): Promise<User> {
    const parsedId = parseInt(id);
    const user = this.repo.findOneBy({ id: parsedId });

    return user;
  }

  find(email: string): Promise<User[]> {
    const user = this.repo.find({ where: { email } });
    return user;
  }

  async update(id: string, attributes: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.repo.remove(user);
  }
}
