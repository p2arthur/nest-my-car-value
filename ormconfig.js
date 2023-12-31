var dbConfig = { synchronize: false };

switch (process.env.NODE_ENV) {
  case 'development':
    console.log('development');
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
