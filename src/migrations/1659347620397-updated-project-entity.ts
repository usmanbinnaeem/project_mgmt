import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedProjectEntity1659347620397 implements MigrationInterface {
    name = 'updatedProjectEntity1659347620397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ALTER COLUMN "sallaryPerHour" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ALTER COLUMN "sallaryPerHour"
            SET NOT NULL
        `);
    }

}
