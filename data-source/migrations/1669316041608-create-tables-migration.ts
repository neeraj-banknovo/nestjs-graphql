import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablesMigration1669316041608 implements MigrationInterface {
  name = 'createTablesMigration1669316041608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "public"."cards_category_enum" AS ENUM(\'physical\', \'virtual\')',
    );
    await queryRunner.query(
      'CREATE TYPE "public"."cards_status_enum" AS ENUM(\'active\', \'closed\')',
    );
    await queryRunner.query(
      'CREATE TABLE "cards" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" "public"."cards_category_enum" NOT NULL DEFAULT \'virtual\', "user_id" uuid NOT NULL, "nick_name" character varying NOT NULL, "last_four" smallint NOT NULL, "status" "public"."cards_status_enum" NOT NULL DEFAULT \'active\', "expiry" character varying NOT NULL, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"users_status_enum\" AS ENUM('active', 'pending', 'suspended', 'deleted')",
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(60) NOT NULL, "last_name" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "age" smallint NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT \'active\', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "cards" ADD CONSTRAINT "FK_1c54b595af68cc3870b651e11c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "cards" DROP CONSTRAINT "FK_1c54b595af68cc3870b651e11c9"',
    );
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "public"."users_status_enum"');
    await queryRunner.query('DROP TABLE "cards"');
    await queryRunner.query('DROP TYPE "public"."cards_status_enum"');
    await queryRunner.query('DROP TYPE "public"."cards_category_enum"');
  }
}
