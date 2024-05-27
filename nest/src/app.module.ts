import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectoriesModule } from './directories/directories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ingenious'),
    NotesModule,
    DirectoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
