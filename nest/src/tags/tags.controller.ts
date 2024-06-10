import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CheckAbilities } from 'src/casl/casl-ability.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { CaslAbilityGuard } from 'src/casl/guards/casl-ability.guard';
import { UserStorage } from 'src/users/storages/user.storage';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './schemas/tag.schema';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createTagDto: CreateTagDto) {
    const user = UserStorage.get();

    return this.tagsService.createTag(createTagDto, user._id);
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: Tag })
  @UseGuards(JwtAuthGuard, CaslAbilityGuard)
  updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: Tag })
  @UseGuards(JwtAuthGuard, CaslAbilityGuard)
  deleteTag(@Param('id') id: string) {
    return this.tagsService.deleteTag(id);
  }
}
