import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private itemRepository: Repository<SaleItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createSaleDto: CreateSaleDto, userId) {
    const saleNew = this.saleRepository.create(createSaleDto);
    await this.saleRepository.save(saleNew);
    const saleId = saleNew.id;

    const items = createSaleDto.saleItems;

    await Promise.all(
      items.map(async (item) => {
        const productValid = await this.productRepository.findOne({
          where: { id: item.idProduct },
        });
        if (!productValid) {
          throw new BadRequestException(
            `Produto ${item.idProduct} não cadastrado!`,
          );
        }
        const saleNew = this.itemRepository.create({
          idSale: saleId,
          idProduct: item.idProduct,
          quantity: item.quantity,
        });
        await this.itemRepository.save(saleNew);
        const productQuantity = productValid.quantity - item.quantity;
        await this.productRepository.update(productValid.id, {
          quantity: productQuantity,
        });
      }),
    );
    return saleNew;
  }

  async findAll() {
    return await this.saleRepository.find();
  }

  async findOne(id: number) {
    return await this.saleRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    const sale = await this.saleRepository.findOne({
      where: { id },
    });
    await this.saleRepository.update(id, {
      canceled: true,
      canceledAt: new Date(),
    });

    const items = await this.itemRepository.findBy({
      idSale: sale.id,
    });

    await Promise.all(
      items.map(async (item) => {
        const productValid = await this.productRepository.findOne({
          where: { id: item.idProduct },
        });
        if (!productValid) {
          throw new BadRequestException(
            `Produto ${item.idProduct} não cadastrado!`,
          );
        }

        const productQuantity = productValid.quantity + item.quantity;
        await this.productRepository.update(productValid.id, {
          quantity: productQuantity,
        });
      }),
    );
    return sale;
  }
}
