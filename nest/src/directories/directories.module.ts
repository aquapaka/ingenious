import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Directory, DirectorySchema } from './schemas/directory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Directory.name, schema: DirectorySchema },
    ]),
  ],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class DirectoriesModule {}
