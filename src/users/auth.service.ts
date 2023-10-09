import { Injectable } from '@nestjs/common/decorators';
import { UserService } from './users.service';
import { User } from './users.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signup(email: string, password: string) {
    const user: User[] = await this.usersService.find(email);

    const userExists: boolean = user.length > 0;

    //See if email is already in use
    if (userExists) {
      throw new BadRequestException('Email in use');
    }

    //Hash the user password

    //Create new user and save it to the database

    //return the user
  }

  signin() {}
}
