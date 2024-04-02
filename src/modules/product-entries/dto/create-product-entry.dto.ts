import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateProductEntryDto {
  @ApiProperty()
  @IsNumber()
  idProduct: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  canceled: boolean;
}
