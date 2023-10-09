import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dot';

let user: User | User[];

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    user = await this.authService.signup(body.email, body.password);
    return user;
  }

  @Post('/signin')
  async signinUser(@Body() body: SigninUserDto) {
    console.log(body);
    user = await this.authService.signin(body.email, body.password);
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    user = await this.usersService.find(email);
    return user;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    user = await this.usersService.remove(id);
    return user;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    user = await this.usersService.update(id, body);
    return user;
  }
}
