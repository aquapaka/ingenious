import { ForbiddenError } from '@casl/ability';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './schemas/tag.schema';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly cls: ClsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createTagDto: CreateTagDto) {
    const user = this.cls.get('user');
    return this.tagsService.createTag(createTagDto, user._id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const tagToUpdate = await this.tagsService.findOneTagById(id);

      const checkTag = new Tag();
      checkTag._owner = tagToUpdate._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Update, checkTag);

      return this.tagsService.updateTag(id, updateTagDto);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTag(@Param('id') id: string) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const tagToDelete = await this.tagsService.findOneTagById(id);

      const checkTag = new Tag();
      checkTag._owner = tagToDelete._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Update, checkTag);

      return this.tagsService.deleteTag(id);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }
}
