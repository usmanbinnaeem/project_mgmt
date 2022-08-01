import { MigrationInterface, QueryRunner } from "typeorm";

export class addedStatusAttributeInUserEntity1658145903379 implements MigrationInterface {
    name = 'addedStatusAttributeInUserEntity1658145903379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'banned', 'inactive')
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'inactive'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_status_enum"
        `);
    }

}
