import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notesService.remove(+id);
  // }
}
