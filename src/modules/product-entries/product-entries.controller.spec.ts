import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntriesController } from './product-entries.controller';
import { ProductEntriesService } from './product-entries.service';

describe('ProductEntriesController', () => {
  let controller: ProductEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductEntriesController],
      providers: [ProductEntriesService],
    }).compile();

    controller = module.get<ProductEntriesController>(ProductEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
