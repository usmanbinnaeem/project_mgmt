import { MigrationInterface, QueryRunner } from "typeorm";

export class removePersonEmailFromClient1657284973056 implements MigrationInterface {
    name = 'removePersonEmailFromClient1657284973056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactEmail"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactEmail" character varying NOT NULL
        `);
    }

}
