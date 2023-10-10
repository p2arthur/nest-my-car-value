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
  Session,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dot';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
let user: User | User[];
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    user = await this.authService.signup(body.email, body.password);

    session.userId = user.id;
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Post('/signin')
  async signinUser(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);

    session.userId = user.id;
    return user;
  }
  //----------------------------------------------------------------------------

  @Post('/signout')
  signoutUser(@Session() session: any) {
    session.userId = null;
    return session;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Get('/session')
  @UseGuards(AuthGuard)
  getUserSession(@CurrentUser() currentUser: User) {
    return currentUser;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Get()
  async findAllUsers(@Query('email') email: string) {
    user = await this.usersService.find(email);
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    user = await this.usersService.remove(id);
    return user;
  }
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    user = await this.usersService.update(id, body);
    return user;
  }
  //----------------------------------------------------------------------------
}
