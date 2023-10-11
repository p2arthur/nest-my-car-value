import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;
  const testEmail = 'cabroncabreiros2@gmail.com';
  const testPassword = '*Thisiscabron';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handles a signup request', async () => {
    return await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: testEmail, password: testPassword })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });

  it('Handles a signin request made with correct credentials and et the currently logged user session', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: testEmail, password: testPassword })
      .expect(201);

    const cookie = response.get('Set-Cookie');

    return await request(app.getHttpServer())
      .get('/auth/session')
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });
});
