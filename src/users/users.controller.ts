import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const response = this.userService.create(body.email, body.password);
    return {
      stautsCode: 201,
      body: JSON.stringify(response),
    };
  }

  @Get(':id')
  async findUser(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return { statusCode: 200, body: user };
  }

  @Get('email')
  async findUserByEmail() {}

  @Patch(':id')
  async updateUser(@Param('id') id: number) {}
}
