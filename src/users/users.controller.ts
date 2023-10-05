import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UserController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return {
      stautsCode: 201,
      body: JSON.stringify(
        `User with email ${body.email} created successfully`,
      ),
    };
  }

  @Get(':id')
  findUser(@Param('id') id: string) {}
}
