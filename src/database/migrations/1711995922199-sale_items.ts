import { MigrationInterface, QueryRunner } from 'typeorm';

export class SaleItems1711995922199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public.sale_items (
                id serial NOT NULL,
                id_sale int NOT NULL,
                id_product int NOT NULL,
                quantity int NOT NULL,
                CONSTRAINT sale_items_pk PRIMARY KEY (id),
                CONSTRAINT sale_items_un UNIQUE (id),
                CONSTRAINT sale_items_fk FOREIGN KEY (id_product) REFERENCES public.products(id),
                CONSTRAINT sale_items_fk_1 FOREIGN KEY (id_sale) REFERENCES public.sales(id)
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.sale_items;`);
  }
}
