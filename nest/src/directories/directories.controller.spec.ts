import { Test, TestingModule } from '@nestjs/testing';
import { DirectoriesController } from './directories.controller';
import { DirectoriesService } from './directories.service';

describe('DirectoriesController', () => {
  let controller: DirectoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectoriesController],
      providers: [DirectoriesService],
    }).compile();

    controller = module.get<DirectoriesController>(DirectoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
