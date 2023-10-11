import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  const dbPath = join(__dirname, '..', 'test.sqlite');
  try {
    await rm(dbPath);
  } catch (error) {}
});
