import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findOneTag(id: string): Promise<Tag> {
    return this.tagModel.findById(id).exec();
  }

  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const owner = await this.userModel
      .findOne({
        _id: createTagDto.ownerId,
      })
      .exec();
    const createdTag = new this.tagModel({ ...createTagDto, _owner: owner });

    return createdTag.save();
  }

  updateTag(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto).exec();
  }

  deleteTag(id: string): Promise<Tag> {
    return this.tagModel.findByIdAndDelete(id).exec();
  }
}
