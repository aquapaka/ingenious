import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note, NoteSchema } from './schemas/note.schema';
import {
  Directory,
  DirectorySchema,
} from 'src/directories/schemas/directory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: Directory.name, schema: DirectorySchema },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
