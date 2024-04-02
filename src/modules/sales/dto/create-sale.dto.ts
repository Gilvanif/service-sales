import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { SaleItemsDto } from './sale-items.dto';

export class CreateSaleDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  totalValue: number;

  @ApiProperty({
    isArray: true,
    type: SaleItemsDto,
  })
  @ValidateNested()
  @Type(() => SaleItemsDto)
  @Transform(({ value }) => value)
  saleItems: SaleItemsDto[];

  constructor(
    description: string,
    totalValue: number,
    saleItems: SaleItemsDto[],
  ) {
    this.description = description;
    this.totalValue = totalValue;
    this.saleItems = saleItems;
  }
}
