import { Module, forwardRef } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tag.name,
        schema: TagSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => CaslModule),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
