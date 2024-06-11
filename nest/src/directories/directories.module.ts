import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Directory, DirectorySchema } from './schemas/directory.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Note, NoteSchema } from '../notes/schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: Directory.name, schema: DirectorySchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class DirectoriesModule {}
