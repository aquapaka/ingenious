import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Action, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';
import { ForbiddenError } from '@casl/ability';
import { Tag } from './schemas/tag.schema';

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
  async updateTag(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const tagToUpdate = await this.tagsService.findOneTag(id);

      const checkTag = new Tag();
      checkTag._owner = tagToUpdate._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Update, checkTag);

      return this.tagsService.updateTag(id, updateTagDto);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }

    return user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteTag(@Param('id') id: string) {
    return 'Deleted';
    // return this.tagsService.deleteTag(id);
  }
}
