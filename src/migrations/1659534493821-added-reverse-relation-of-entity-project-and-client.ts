import { MigrationInterface, QueryRunner } from "typeorm";

export class addedReverseRelationOfEntityProjectAndClient1659534493821 implements MigrationInterface {
    name = 'addedReverseRelationOfEntityProjectAndClient1659534493821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "clientId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "clientId"
        `);
    }

}
