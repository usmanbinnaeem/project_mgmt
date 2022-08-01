import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedProfileEntity1659335580572 implements MigrationInterface {
    name = 'updatedProfileEntity1659335580572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."profiles_jobtype_enum" AS ENUM('Full Time', 'Part Time')
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "jobType" "public"."profiles_jobtype_enum" NOT NULL DEFAULT 'Full Time'
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "sallaryPerHour" integer NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "sallaryPerHour"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "jobType"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."profiles_jobtype_enum"
        `);
    }

}
