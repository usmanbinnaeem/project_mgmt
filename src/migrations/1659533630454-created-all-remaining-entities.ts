import { MigrationInterface, QueryRunner } from "typeorm";

export class createdAllRemainingEntities1659533630454 implements MigrationInterface {
    name = 'createdAllRemainingEntities1659533630454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "projectCategory" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_af3b1d4c8441689ee53935fab40" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "projectDocument" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "version" integer NOT NULL,
                "author" character varying NOT NULL,
                "type" character varying NOT NULL,
                "projectId" integer,
                CONSTRAINT "PK_059b8f102639861bb0542000970" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "duration" character varying,
                "budget" character varying NOT NULL,
                "proposal" character varying,
                "feasibility" character varying,
                "isInHouse" boolean NOT NULL,
                "status" boolean NOT NULL,
                "categoryId" integer,
                "teamId" integer,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "description" character varying,
                "reporter" character varying NOT NULL,
                "priority" integer,
                "estimatedDuration" character varying,
                "status" boolean NOT NULL DEFAULT false,
                "assigneeId" integer,
                "projectId" integer,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "salaryPerHour" integer DEFAULT '10'
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD "teamId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "projectDocument"
            ADD CONSTRAINT "FK_3453a51e933836c1029e712c79b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_3caef906211aad45559039f11f9" FOREIGN KEY ("categoryId") REFERENCES "projectCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_d0474b642dc0ae63660dd8e2ac0" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_ae93eae3724956f4c82d69f38af" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_ae93eae3724956f4c82d69f38af"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_d0474b642dc0ae63660dd8e2ac0"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_3caef906211aad45559039f11f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "projectDocument" DROP CONSTRAINT "FK_3453a51e933836c1029e712c79b"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "teamId"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP COLUMN "salaryPerHour"
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "team"
        `);
        await queryRunner.query(`
            DROP TABLE "projectDocument"
        `);
        await queryRunner.query(`
            DROP TABLE "projectCategory"
        `);
    }

}
