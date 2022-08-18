import { MigrationInterface, QueryRunner } from "typeorm";

export class changedUserAttributeOfUserEntityToUsername1660818047298 implements MigrationInterface {
    name = 'changedUserAttributeOfUserEntityToUsername1660818047298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "name" TO "username"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "username" TO "name"
        `);
    }

}
