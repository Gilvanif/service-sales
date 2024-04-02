import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_entries' })
export class ProductEntries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_product' })
  idProduct: number;

  @Column()
  quantity: number;

  @Column({ name: 'date_created' })
  dateCreated: Date;

  @Column()
  canceled: boolean;
}
