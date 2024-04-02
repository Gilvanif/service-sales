import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productValid = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (productValid) {
      throw new BadRequestException('Produto ja cadastrado!');
    }
    const productNew = this.productRepository.create(createProductDto);
    await this.productRepository.save(productNew);
    return productNew;
  }

  async findAll() {
    return await this.productRepository.findBy({ active: true });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productValid = await this.productRepository.findOne({
      where: { id },
    });
    if (!productValid) {
      throw new BadRequestException('Produto não cadastrado!');
    }
    await this.productRepository.update(id, updateProductDto);
    return updateProductDto;
  }

  async remove(id: number) {
    const productValid = await this.productRepository.findOne({
      where: { id },
    });
    if (!productValid) {
      throw new BadRequestException('Produto não cadastrado!');
    }
    await this.productRepository.update(id, { active: false });
    return { id: productValid.id, name: productValid.name };
  }
}
