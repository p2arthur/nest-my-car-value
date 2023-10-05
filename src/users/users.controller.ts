import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  findUser(@Param('id') id: string) {}
}
