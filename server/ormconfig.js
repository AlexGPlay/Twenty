module.exports = {
  type: 'postgres',
  database: 'test',
  username: 'test',
  password: 'test',
  logging: true,
  synchronize: true,
  entities: ['dist/entities/*'],
  migrations: ['dist/migrations/*'],
  cli: { migrationsDir: "src/migrations" }
}