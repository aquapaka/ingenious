import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Directory, DirectoryDocument } from './schemas/directory.schema';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { Note } from 'src/notes/schemas/note.schema';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Injectable()
export class DirectoriesService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  // async getMainDirectory(): Promise<Directory> {
  //   const main = await this.directoryModel.findOne();
  //   if (main) return main;

  //   const createdDirectory = new this.directoryModel({
  //     title: 'MainDirectory',
  //     directories: [],
  //     notes: [],
  //   });
  //   return createdDirectory.save();
  // }

  // async createDirectory(createDirectoryDto: CreateDirectoryDto) {
  //   const { icon, title, parentDirectoryId } = createDirectoryDto;
  //   const newDirectory = new this.directoryModel({
  //     icon,
  //     title,
  //     directories: [],
  //     notes: [],
  //   });
  //   let parentDir: DirectoryDocument;
  //   if (parentDirectoryId) {
  //     parentDir = await this.directoryModel.findById(parentDirectoryId);
  //   } else {
  //     parentDir = await this.directoryModel.findOne();
  //   }
  //   parentDir.directories.push(newDirectory);
  //   parentDir.save();

  //   return newDirectory.save();
  // }

  // updateDirectory(id: string, updateDirectotyDto: UpdateDirectoryDto) {
  //   const { icon, title, directories, notes } = updateDirectotyDto;
  //   return this.directoryModel.updateOne(
  //     {
  //       _id: id,
  //     },
  //     {
  //       icon,
  //       title,
  //       directories,
  //       notes,
  //     },
  //   );
  // }

  // private async recursivePushNotes(
  //   currDir: DirectoryDocument,
  //   targetDir: DirectoryDocument,
  // ) {
  //   if (currDir.notes.length) {
  //     await targetDir.updateOne({ $push: { notes: currDir.notes } });
  //     await this.noteModel.updateMany(
  //       { _id: { $in: currDir.notes } },
  //       {
  //         isTrash: true,
  //       },
  //     );
  //   }

  //   for (const dir of currDir.directories) {
  //     await this.recursivePushNotes(dir, targetDir);
  //   }
  // }

  // async deleteDirectory(id: string) {
  //   const thisDir = await this.directoryModel.findById(id);
  //   const mainDirectory = await this.directoryModel.findOne();
  //   this.recursivePushNotes(thisDir, mainDirectory);

  //   return this.directoryModel.findByIdAndDelete(id);
  // }
}
