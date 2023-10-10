import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './users.service';
import { User } from './users.entity';
import { async } from 'rxjs';

let service: AuthService;

beforeEach(async () => {
  //1.Create a fake copy of the UserService for testing only
  const fakeUserService: Partial<UserService> = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };

  //2.Create a Dependency Injection container for testing only
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UserService, useValue: fakeUserService },
    ],
  }).compile();

  service = module.get(AuthService);
});

it('can create an instance of auth service', async () => {
  expect(service).toBeDefined();
});
