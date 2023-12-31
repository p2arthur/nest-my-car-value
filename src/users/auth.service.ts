import { Injectable } from '@nestjs/common/decorators';
import { UserService } from './users.service';
import { User } from './users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signup(email: string, password: string) {
    const users: User[] = await this.usersService.find(email);

    const userExists: boolean = users.length > 0;

    //See if email is already in use
    if (userExists) {
      throw new BadRequestException('Emaill in use');
    }

    //Salt and Hash the user password

    //1. Generate a salt
    const salt = randomBytes(8).toString('hex');

    //2. Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //3. Join the hashed result and the salt together

    const result = salt + '.' + hash.toString('hex');

    //Create new user and save it to the database
    const user = await this.usersService.create(email, result);

    //return the user
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  async signin(email: string, password: string) {
    const [user]: any = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User with the given email not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = hash.toString('hex');

    if (result !== storedHash) {
      throw new BadRequestException('Wrong password');
    }
    return user;
  }
  //----------------------------------------------------------------------------
}
