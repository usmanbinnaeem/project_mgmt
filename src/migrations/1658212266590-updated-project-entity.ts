import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedProjectEntity1658212266590 implements MigrationInterface {
    name = 'updatedProjectEntity1658212266590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project"
            ALTER COLUMN "title"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "isInHouse"
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "isInHouse" boolean NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "isInHouse"
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "isInHouse" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ALTER COLUMN "title" DROP NOT NULL
        `);
    }

}
