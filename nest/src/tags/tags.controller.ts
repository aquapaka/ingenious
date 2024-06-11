import { ForbiddenError } from '@casl/ability';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClsService } from 'nestjs-cls';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { FindOneParams } from '../validation/findOneParams';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './schemas/tag.schema';
import { TagsService } from './tags.service';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly cls: ClsService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getTag(@Param() params: FindOneParams) {
    return this.tagsService.findOneTagById(params.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createTagDto: CreateTagDto) {
    const user = this.cls.get('user');
    return this.tagsService.createTag(createTagDto, user._id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTag(
    @Param() params: FindOneParams,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const tagToUpdate = await this.tagsService.findOneTagById(params.id);

      const checkTag = new Tag();
      checkTag._owner = tagToUpdate._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Update, checkTag);

      return this.tagsService.updateTag(params.id, updateTagDto);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTag(@Param() params: FindOneParams) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const tagToDelete = await this.tagsService.findOneTagById(params.id);

      const checkTag = new Tag();
      checkTag._owner = tagToDelete._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Delete, checkTag);

      return this.tagsService.deleteTag(params.id);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }
}
