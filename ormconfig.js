module.exports = {
    type: 'mysql',
    url:'mysql://root:convocatoria@localhost:3306/convocatoria',
    migrationsRun: true,
    logging: true,
    timezone: '+0',
    bigNumberStrings: false,
   
    entities: [process.env.ENVIRONMENT == 'prod' ? '**/infrastructure/persistence/typeorm/entities/*.js' : 'dist/**/infrastructure/persistence/typeorm/entities/*.js'],
    //ruta donde tiene que leer las migraciones
    migrations: [process.env.ENVIRONMENT == 'prod' ? 'common/infrastructure/persistence/typeorm/migrations/*.js' : 'dist/common/infrastructure/persistence/typeorm/migrations/*.js'],
    //ruta donde se generan las migraciones
    cli: {
      migrationsDir: process.env.ENVIRONMENT == 'prod' ? 'common/infrastructure/persistence/typeorm/migrations' : 'src/common/infrastructure/persistence/typeorm/migrations',
    },
  };
  