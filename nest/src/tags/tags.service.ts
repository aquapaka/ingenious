import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  findOneTagById(id: string): Promise<Tag> {
    return this.tagModel.findById(id).exec();
  }

  async createTag(createTagDto: CreateTagDto, ownerId: string): Promise<Tag> {
    const createdTag = new this.tagModel({
      ...createTagDto,
      _owner: new mongoose.Types.ObjectId(ownerId),
    });

    return createdTag.save();
  }

  updateTag(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto).exec();
  }

  deleteTag(id: string): Promise<Tag> {
    return this.tagModel.findByIdAndDelete(id).exec();
  }
}
