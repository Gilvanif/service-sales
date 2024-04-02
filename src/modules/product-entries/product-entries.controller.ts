import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductEntriesService } from './product-entries.service';
import { CreateProductEntryDto } from './dto/create-product-entry.dto';

@Controller('product-entries')
export class ProductEntriesController {
  constructor(private readonly productEntriesService: ProductEntriesService) {}

  @Post()
  create(@Body() createProductEntryDto: CreateProductEntryDto) {
    return this.productEntriesService.create(createProductEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productEntriesService.remove(+id);
  }
}
