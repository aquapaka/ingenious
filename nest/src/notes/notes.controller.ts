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
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FindOneParams } from '../validation/findOneParams';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { ClsService } from 'nestjs-cls';
import { Note } from './schemas/note.schema';
import { ForbiddenError } from '@casl/ability';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly cls: ClsService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getNote(@Param() params: FindOneParams) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const directoryToUpdate = await this.notesService.findOneNoteById(
        params.id,
      );

      const checkNote = new Note();
      checkNote._owner = directoryToUpdate._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Read, checkNote);

      return this.notesService.findOneNoteById(params.id);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createNote(@Body() createNoteDto: CreateNoteDto) {
    const user = this.cls.get('user');
    return this.notesService.createNote(createNoteDto, user._id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateNote(
    @Param() params: FindOneParams,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const directoryToUpdate = await this.notesService.findOneNoteById(
        params.id,
      );

      const checkNote = new Note();
      checkNote._owner = directoryToUpdate._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Update, checkNote);

      return this.notesService.updateNote(params.id, updateNoteDto);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNote(@Param() params: FindOneParams) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const directoryToDelete = await this.notesService.findOneNoteById(
        params.id,
      );

      const checkNote = new Note();
      checkNote._owner = directoryToDelete._owner;

      ForbiddenError.from(ability).throwUnlessCan(Action.Delete, checkNote);

      return this.notesService.deleteNote(params.id);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }
}
