import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from '../casl/casl.module';
import { DirectoriesController } from './directories.controller';
import { DirectoriesService } from './directories.service';
import { Directory, DirectorySchema } from './schemas/directory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Directory.name, schema: DirectorySchema },
    ]),
    CaslModule,
  ],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
})
export class DirectoriesModule {}
