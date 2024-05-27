import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Post()
  create(@Body() createDirectoryDto: CreateDirectoryDto) {
    return this.directoriesService.create(createDirectoryDto);
  }

  @Get()
  findAll() {
    return this.directoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectoryDto: UpdateDirectoryDto) {
    return this.directoriesService.update(+id, updateDirectoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directoriesService.remove(+id);
  }
}
