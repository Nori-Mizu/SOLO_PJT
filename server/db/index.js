const environment = process.env.DATABASE_URL ? "production" : "development";
knex(knexConfig[environment]);
