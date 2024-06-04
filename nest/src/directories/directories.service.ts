import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Directory, DirectoryDocument } from './schemas/directory.schema';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { Note } from 'src/notes/schemas/note.schema';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
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

  async createDirectory(createDirectoryDto: CreateDirectoryDto) {
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

  deleteDirectory(id: string) {
    return this.directoryModel.findByIdAndDelete(id);
  }
}
