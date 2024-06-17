import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { DirectoriesModule } from './directories/directories.module';
import { NotesModule } from './notes/notes.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_DB_URI,
        dbName: process.env.MONGO_DB_NAME,
        auth: {
          username: process.env.MONGO_DB_USER,
          password: process.env.MONGO_DB_PASS,
        },
      }),
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    NotesModule,
    DirectoriesModule,
    UsersModule,
    AuthModule,
    TagsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
