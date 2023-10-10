import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './users.service';
import { User } from './users.entity';
import {
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
describe('AuthService', () => {
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  let service: AuthService;
  let fakeUserService: Partial<UserService>;
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  beforeEach(async () => {
    const users: User[] = [];

    //1.Create a fake copy of the UserService for testing only
    fakeUserService = {
      find: async (email: string) => {
        const filteredEmail = users.filter((user) => user.email === email);

        return Promise.resolve(filteredEmail);
      },
      create: (email: string, password: string) => {
        const user: User = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    //2.Create a Dependency Injection container for testing only
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: fakeUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('mariola@gmail.com', '*Thisismariola');

    expect(user.password).not.toEqual('*Thisismariola');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('throws a BadRequestExceptionError if user signs up with email that is in use', async () => {
    await service.signup('marcoladesnipe@gmail.com', '*Thisismarcola');

    expect(
      service.signup('marcoladesnipe@gmail.com', '*Thisismarcola'),
    ).rejects.toThrow(BadRequestException);
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('user tries to login with a not registered email', async () => {
    await expect(
      service.signin('notusedemail@gmail.com', 'notusedemail'),
    ).rejects.toThrow(NotFoundException);
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('user cannot signin using a wrong password', async () => {
    await service.signup('p2arthur@gmail.com', '*Thisisrightpassword');
    await expect(
      service.signin('p2arthur@gmail.com', '*Thisiswrongpassword'),
    ).rejects.toThrow(BadRequestException);
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('user can signin using its credentials', async () => {
    await service.signup('p2arthur@gmail.com', '*Thisp2');

    expect(service.signin('p2arthur@gmail.com', '*Thisp2')).toBeDefined();
  });
  //----------------------------------------------------------------------------
});
