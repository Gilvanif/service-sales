import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1711978647927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public.products (
                id serial NOT NULL,
                "name" varchar NOT NULL,
                value numeric(10, 2) NOT NULL DEFAULT 0,
                quantity int NOT NULL DEFAULT 0,
                active boolean NOT NULL DEFAULT true,
                CONSTRAINT product_pk PRIMARY KEY (id),
                CONSTRAINT product_un UNIQUE (id)
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.products;`);
  }
}
