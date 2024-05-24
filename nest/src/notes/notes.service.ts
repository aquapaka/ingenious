import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  // update(id: number, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}
