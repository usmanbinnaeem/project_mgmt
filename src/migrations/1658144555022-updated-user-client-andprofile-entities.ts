import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedUserClientAndprofileEntities1658144555022 implements MigrationInterface {
    name = 'updatedUserClientAndprofileEntities1658144555022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "profileId"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "REL_6c3a73bbc9d8a8082816adc870"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "clientId"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "UQ_315ecd98bd1a42dcf2ec4e2e985" UNIQUE ("userId")
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactPerson" character varying DEFAULT 'John Doe'
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactEmail" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD CONSTRAINT "UQ_ad3b4bf8dd18a1d467c5c0fc13a" UNIQUE ("userId")
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactNumber" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "client" DROP CONSTRAINT "FK_ad3b4bf8dd18a1d467c5c0fc13a"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactNumber" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP CONSTRAINT "UQ_ad3b4bf8dd18a1d467c5c0fc13a"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactEmail"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactPerson"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "UQ_315ecd98bd1a42dcf2ec4e2e985"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "clientId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "REL_6c3a73bbc9d8a8082816adc870" UNIQUE ("clientId")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "profileId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
