import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Directory, DirectorySchema } from './schemas/directory.schema';
import { Note, NoteSchema } from 'src/notes/schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: Directory.name, schema: DirectorySchema },
    ]),
  ],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class DirectoriesModule {}
