import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedProjectCategoryEntity1658212873388 implements MigrationInterface {
    name = 'updatedProjectCategoryEntity1658212873388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projectCategory"
            ALTER COLUMN "name"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "projectCategory"
            ALTER COLUMN "name" DROP NOT NULL
        `);
    }

}
