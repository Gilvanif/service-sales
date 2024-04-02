import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class SaleItemsDto {
  @ApiProperty()
  @IsNumber()
  idProduct: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  constructor(idProduct: number, quantity: number) {
    this.idProduct = idProduct;
    this.quantity = quantity;
  }
}
