import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from '../casl/casl.module';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Note, NoteSchema } from './schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    CaslModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
