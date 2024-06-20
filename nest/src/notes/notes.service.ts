import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  findOneNoteById(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async createNote(
    createNoteDto: CreateNoteDto,
    ownerId: string,
  ): Promise<Note> {
    const createdNote = new this.noteModel({
      ...createNoteDto,
      _owner: new mongoose.Types.ObjectId(ownerId),
      _tags: createNoteDto.tagIds
        ? createNoteDto.tagIds.map(
            (tagId) => new mongoose.Types.ObjectId(tagId),
          )
        : null,
      _directory: createNoteDto.directoryId
        ? new mongoose.Types.ObjectId(createNoteDto.directoryId)
        : null,
    });

    return createdNote.save();
  }

  updateNote(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel
      .findByIdAndUpdate(id, {
        ...updateNoteDto,
        ...(updateNoteDto.tagIds && {
          _tags: updateNoteDto.tagIds.map(
            (tagId) => new mongoose.Types.ObjectId(tagId),
          ),
        }),
      })
      .exec();
  }

  deleteNote(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
