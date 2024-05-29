import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Directory, DirectoryDocument } from './schemas/directory.schema';
import { CreateDirectoryDto } from './dto/create-directory.dto';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
  ) {}

  async getMainDirectory(): Promise<Directory> {
    const main = await this.directoryModel.findOne();
    if (main) return main;

    const createdDirectory = new this.directoryModel({
      title: 'MainDirectory',
      directories: [],
      notes: [],
    });
    return createdDirectory.save();
  }

  async create(createDirectoryDto: CreateDirectoryDto) {
    const { icon, title, parentDirectoryId } = createDirectoryDto;
    const newDirectory = new this.directoryModel({
      icon,
      title,
      directories: [],
      notes: [],
    });
    let parentDir: DirectoryDocument;
    if (parentDirectoryId) {
      parentDir = await this.directoryModel.findById(parentDirectoryId);
    } else {
      parentDir = await this.directoryModel.findOne();
    }
    parentDir.directories.push(newDirectory);
    parentDir.save();

    return newDirectory.save();
  }
}
