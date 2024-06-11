import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { CaslModule } from '../casl/casl.module';
import { ConfigModule } from '@nestjs/config';
import { Model } from 'mongoose';

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;
  const mockUserModel: jest.Mock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [TagsController],
      providers: [
        TagsService,
        {
          provide: getModelToken(Tag.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
