import { Module } from '@nestjs/common';
import { ProductEntriesService } from './product-entries.service';
import { ProductEntriesController } from './product-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntries } from './entities/product-entry.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntries]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductEntriesController],
  providers: [ProductEntriesService],
})
export class ProductEntriesModule {}
