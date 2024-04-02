import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sales1711995910606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public.sales (
                id serial NOT NULL,
                description varchar NULL,
                total_value numeric(10, 2) NULL,
                user_id serial NOT NULL,
                canceled boolean NOT NULL DEFAULT false,
                canceled_at date NULL,
                date_created date NOT NULL DEFAULT CURRENT_DATE,
                CONSTRAINT sales_pk PRIMARY KEY (id),
                CONSTRAINT sales_un UNIQUE (id),
                CONSTRAINT sales_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.sales;`);
  }
}
