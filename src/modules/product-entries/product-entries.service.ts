import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductEntryDto } from './dto/create-product-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntries } from './entities/product-entry.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductEntriesService {
  constructor(
    @InjectRepository(ProductEntries)
    private entriesRepository: Repository<ProductEntries>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductEntryDto: CreateProductEntryDto) {
    const productValid = await this.productRepository.findOne({
      where: { id: createProductEntryDto.idProduct },
    });
    if (!productValid) {
      throw new BadRequestException('Produto não cadastrado!');
    }
    const productEntriesNew = this.entriesRepository.create(
      createProductEntryDto,
    );
    await this.entriesRepository.save(productEntriesNew);

    const totalQuantity =
      createProductEntryDto.quantity + productValid.quantity;

    await this.productRepository.update(productValid.id, {
      quantity: totalQuantity,
    });
    return {
      id: productEntriesNew.id,
      quantity: productEntriesNew.quantity,
      totalQuantity: totalQuantity,
    };
  }

  async remove(id: number) {
    const productEntriesValid = await this.entriesRepository.findOne({
      where: { id },
    });
    if (!productEntriesValid) {
      throw new BadRequestException('Entrada não cadastrado!');
    }
    if (productEntriesValid.canceled) {
      throw new BadRequestException('Entrada já excluída cadastrado!');
    }
    const productValid = await this.productRepository.findOne({
      where: { id: productEntriesValid.idProduct },
    });
    if (!productValid) {
      throw new BadRequestException('Produto não cadastrado!');
    }

    const totalQuantity = productValid.quantity - productEntriesValid.quantity;
    await this.productRepository.update(productValid.id, {
      quantity: totalQuantity,
    });
    await this.entriesRepository.update(id, { canceled: true });
    return {
      id: productEntriesValid.id,
      idProduct: productEntriesValid.idProduct,
      quantity: productEntriesValid.quantity,
    };
  }
}
