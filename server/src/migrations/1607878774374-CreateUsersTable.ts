import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1607878774374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" ("id" serial primary key, "createdAt" timestamp, "updatedAt" timestamp, "email" varchar(255), "password" varchar(255));
        `)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
