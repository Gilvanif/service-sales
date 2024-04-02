import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1711995893923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public.users (
                id serial NOT NULL,
                "name" varchar NULL,
                "password" varchar NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                CONSTRAINT users_pk PRIMARY KEY (id),
                CONSTRAINT users_items_un UNIQUE (id)
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.users;`);
  }
}
