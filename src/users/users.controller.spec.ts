import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';

describe('UserController', () => {
  let controller: UserController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {
    fakeUserService = {
      findOne: async () => {
        return Promise.resolve({} as User);
      },
      find: async (email: string) => {
        return Promise.resolve({} as User[]);
      },
      create: async (email: string) => {
        return Promise.resolve({} as User);
      },
    };

    fakeAuthService = {
      signin: async (email: string) => {
        return Promise.resolve({} as User[]);
      },
      signup: async (email: string) => {
        return Promise.resolve({} as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
