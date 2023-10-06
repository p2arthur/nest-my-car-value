import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const user = this.userService.create(body.email, body.password);
    return {
      stautsCode: 201,
      body: user,
    };
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return { statusCode: 200, body: user };
  }

  @Get()
  async findUserByEmail(@Query('email') email: string) {
    const user = await this.userService.find(email);
    return { statusCode: 200, body: user };
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(id, body);
    return { statusCode: 200, body: user };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return { statusCode: 200, body: user };
  }
}
