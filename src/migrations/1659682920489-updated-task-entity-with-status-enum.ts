import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedTaskEntityWithStatusEnum1659682920489 implements MigrationInterface {
    name = 'updatedTaskEntityWithStatusEnum1659682920489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."task_status_enum" AS ENUM('todo', 'in progress', 'done')
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "status" "public"."task_status_enum" NOT NULL DEFAULT 'todo'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."task_status_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "status" boolean NOT NULL DEFAULT false
        `);
    }

}
