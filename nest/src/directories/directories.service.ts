import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Directory } from './schemas/directory.schema';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
  ) {}

  getMainDirectory(): Promise<Directory> {
    const main = this.directoryModel.findOne();
    if (main) return main;

    const createdDirectory = new this.directoryModel({
      title: 'MainDirectory',
      directories: [],
      notes: [],
    });
    return createdDirectory.save();
  }
}
