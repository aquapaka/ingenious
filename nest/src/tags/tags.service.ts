import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    return createdTag.save();
  }

  updateTag(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto).exec();
  }

  deleteTag(id: string): Promise<Tag> {
    return this.tagModel.findByIdAndDelete(id).exec();
  }
}
