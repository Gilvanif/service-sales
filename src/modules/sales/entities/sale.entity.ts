import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  canceled: boolean;

  @Column({ name: 'canceled_at' })
  canceledAt: Date;

  @Column({ name: 'date_created' })
  dateCreated: Date;

  @Column({ name: 'total_value' })
  totalValue: number;
}
