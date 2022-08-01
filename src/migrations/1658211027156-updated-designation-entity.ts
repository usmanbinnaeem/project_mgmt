import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedDesignationEntity1658211027156 implements MigrationInterface {
    name = 'updatedDesignationEntity1658211027156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "designations"
            ADD "responsibilities" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "designations" DROP COLUMN "responsibilities"
        `);
    }

}
