import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductEntries1711996047017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public.product_entries (
                id serial NOT NULL,
                id_product int NOT NULL,
                quantity int NOT NULL,
                date_created date NOT NULL DEFAULT CURRENT_DATE,
                canceled boolean NULL DEFAULT false,
                CONSTRAINT product_entries_pk PRIMARY KEY (id),
                CONSTRAINT product_entries_un UNIQUE (id),
                CONSTRAINT product_entries_fk FOREIGN KEY (id_product) REFERENCES public.products(id)
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.product_entries;`);
  }
}
