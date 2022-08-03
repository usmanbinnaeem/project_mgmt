import { MigrationInterface, QueryRunner } from "typeorm";

export class updated1659508701550 implements MigrationInterface {
    name = 'updated1659508701550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles"
                RENAME COLUMN "sallaryPerHour" TO "salaryPerHour"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles"
                RENAME COLUMN "salaryPerHour" TO "sallaryPerHour"
        `);
    }

}
