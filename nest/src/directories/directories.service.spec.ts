import { Test, TestingModule } from '@nestjs/testing';
import { DirectoriesService } from './directories.service';

describe('DirectoriesService', () => {
  let service: DirectoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectoriesService],
    }).compile();

    service = module.get<DirectoriesService>(DirectoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
