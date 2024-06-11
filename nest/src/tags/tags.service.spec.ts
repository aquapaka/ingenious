import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { Tag } from './schemas/tag.schema';

describe('TagsService', () => {
  let service: TagsService;
  const mockTagModel: jest.Mock = jest.fn();
  const mockUserModel: jest.Mock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getModelToken(Tag.name),
          useValue: Model,
        },
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOneTagById should return a tag with exact id', async () => {
    const TAG_ID = '6666788382a8bf2c32536aad';
    const tag = new Tag();
    tag._id = new mongoose.Types.ObjectId(TAG_ID);
    tag.name = 'demo-tag';

    mockTagModel.mockImplementation(() => ({
      findById: jest.fn().mockImplementation((id) => {
        if (id === tag._id) return tag;
        return null;
      }),
    }));

    const foundTag = await service.findOneTagById(TAG_ID);
    expect(foundTag).toEqual(tag);
  });
});
