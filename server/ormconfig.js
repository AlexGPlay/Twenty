module.exports = {
  type: 'postgres',
  database: 'test',
  username: 'test',
  password: 'test',
  logging: true,
  synchronize: false,
  entities: ['dist/entities/*'],
  migrations: ['dist/migrations/*'],
  cli: { migrationsDir: "src/migrations" }
}