import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1657106615563 implements MigrationInterface {
    name = 'initial1657106615563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "designations" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_a0f024b99b1491a03fc421858ea" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "projectCategory" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying,
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
                "title" character varying,
                "duration" character varying,
                "budget" character varying NOT NULL,
                "proposal" character varying,
                "feasibility" character varying,
                "isInHouse" character varying NOT NULL,
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
                "asigneeId" integer,
                "projectId" integer,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "profiles" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "avatar" character varying,
                "address" character varying NOT NULL,
                "isRemote" boolean NOT NULL DEFAULT false,
                "totalHours" integer NOT NULL,
                "designationId" integer,
                "teamId" integer,
                CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'staff', 'client')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."users_role_enum" NOT NULL DEFAULT 'staff',
                "profileId" integer,
                "clientId" integer,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"),
                CONSTRAINT "REL_6c3a73bbc9d8a8082816adc870" UNIQUE ("clientId"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "contactNumber" integer NOT NULL,
                "contactEmail" character varying NOT NULL,
                "address" character varying,
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
            )
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
            ADD CONSTRAINT "FK_ecdcfa78365fd6f1ef08e9d9a59" FOREIGN KEY ("asigneeId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_d8d55cb8ff0ee47f07c76b80432" FOREIGN KEY ("designationId") REFERENCES "designations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles"
            ADD CONSTRAINT "FK_ae93eae3724956f4c82d69f38af" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_ae93eae3724956f4c82d69f38af"
        `);
        await queryRunner.query(`
            ALTER TABLE "profiles" DROP CONSTRAINT "FK_d8d55cb8ff0ee47f07c76b80432"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_ecdcfa78365fd6f1ef08e9d9a59"
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
            DROP TABLE "client"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_role_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "profiles"
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
        await queryRunner.query(`
            DROP TABLE "designations"
        `);
    }

}
