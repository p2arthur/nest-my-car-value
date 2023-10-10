import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: async (id: string) => {
        return Promise.resolve({
          id: parseInt(id),
          email: 'peronfas@gmail.com',
          password: '*Thisisperonfas',
        } as User);
      },
      find: async (email: string) => {
        return Promise.resolve([
          {
            id: Math.floor(Math.random() * 9999),
            email,
            password: '*Thisisperonfas',
          },
        ] as User[]);
      },
    };

    fakeAuthService = {
      signin: async (email: string, password: string) => {
        return Promise.resolve({ id: 3, email, password } as User);
      },
      signup: async (email: string, password: string) => {
        return Promise.resolve({ id: 3, email, password } as User);
      },
    };
    //----------------------------------------------------------------------------

    //----------------------------------------------------------------------------
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('should return a NotFoundExcepiton if a user with a non existing id is queried', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrowError(
      NotFoundException,
    );
  });

  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('should return a user with the given id', async () => {
    expect(await controller.findUser('1')).toBeDefined();
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('should return all users with the given email', async () => {
    const user = await controller.findAllUsers('p2arthur@gmail.com');

    expect(user[0].email).toEqual('p2arthur@gmail.com');
  });
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  it('should update session object and return user', async () => {
    const session = { userId: 0 };
    const user = await controller.signinUser(
      { email: 'p2arthur@gmail.com', password: '*paranaue' },
      session,
    );

    expect(user.id).toEqual(3);
    expect(session.userId).toEqual(3);
  });
  //----------------------------------------------------------------------------
});
