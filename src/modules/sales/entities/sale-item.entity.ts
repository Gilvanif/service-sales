import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sale_items' })
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_sale' })
  idSale: number;

  @Column({ name: 'id_product' })
  idProduct: number;

  @Column()
  quantity: number;
}
