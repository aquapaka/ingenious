import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Directory,
  DirectoryDocument,
} from 'src/directories/schemas/directory.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { icon, title, tags, content, parentDirectoryId } = createNoteDto;
    const createdNote = new this.noteModel({
      icon,
      title,
      tags,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    let parentDir: DirectoryDocument;
    if (parentDirectoryId) {
      parentDir = await this.directoryModel.findById(parentDirectoryId);
    } else {
      parentDir = await this.directoryModel.findOne();
    }
    parentDir.notes.push(createdNote);
    parentDir.save();

    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteModel.updateOne(
      { _id: id },
      {
        $set: updateNoteDto,
      },
    );
  }

  remove(id: string) {
    return this.noteModel.deleteOne({
      _id: id,
    });
  }
}
