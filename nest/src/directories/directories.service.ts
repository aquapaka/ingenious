import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { Directory } from './schemas/directory.schema';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
  ) {}

  findOneDirectoryById(id: string): Promise<Directory> {
    return this.directoryModel.findById(id).exec();
  }

  async createDirectory(
    createDirectoryDto: CreateDirectoryDto,
    ownerId: string,
  ): Promise<Directory> {
    const createdDirectory = new this.directoryModel({
      ...createDirectoryDto,
      _owner: new mongoose.Types.ObjectId(ownerId),
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
