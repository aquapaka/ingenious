import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectoriesModule } from './directories/directories.module';
import { MONGO_DB_URL } from './constants';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DB_URL),
    NotesModule,
    DirectoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
