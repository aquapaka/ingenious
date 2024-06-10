import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // @Get()
  // findAllNote() {
  //   return this.notesService.findAllNote();
  // }

  // @Get(':id')
  // findOneNote(@Param('id') id: string) {
  //   return this.notesService.findOneNote(id);
  // }

  // @Post()
  // createNote(@Body() createNoteDto: CreateNoteDto) {
  //   return this.notesService.create(createNoteDto);
  // }

  // @Patch(':id')
  // updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.notesService.updateNote(id, updateNoteDto);
  // }

  // @Delete(':id')
  // removeNote(@Param('id') id: string) {
  //   return this.notesService.deleteNote(id);
  // }
}
