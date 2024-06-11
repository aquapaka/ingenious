import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from 'src/notes/schemas/note.schema';
import { User } from '../users/schemas/user.schema';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { Directory } from './schemas/directory.schema';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findOneDirectoryById(id: string): Promise<Directory> {
    return this.directoryModel.findById(id).exec();
  }

  async createDirectory(
    createDirectoryDto: CreateDirectoryDto,
    ownerId: string,
  ): Promise<Directory> {
    const owner = await this.userModel
      .findOne({
        _id: ownerId,
      })
      .exec();
    const createdDirectory = new this.directoryModel({
      ...createDirectoryDto,
      _owner: owner,
    });

    return createdDirectory.save();
  }

  updateDirectory(
    id: string,
    updateDirectoryDto: UpdateDirectoryDto,
  ): Promise<Directory> {
    return this.directoryModel.findByIdAndUpdate(id, updateDirectoryDto).exec();
  }

  deleteDirectory(id: string): Promise<Directory> {
    return this.directoryModel.findByIdAndDelete(id).exec();
  }
}
