import { MigrationInterface, QueryRunner } from 'typeorm';

export class tablesMigration1669361441076 implements MigrationInterface {
  name = 'tablesMigration1669361441076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "cards" ALTER COLUMN "deleted_at" DROP DEFAULT',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "cards" ALTER COLUMN "deleted_at" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "deleted_at" SET DEFAULT now()',
    );
  }
}
