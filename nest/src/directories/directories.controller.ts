import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Get('/main')
  getMainDirectory() {
    return this.directoriesService.getMainDirectory();
  }

  @Post()
  createDirectory(@Body() createDirectoryDto: CreateDirectoryDto) {
    return this.directoriesService.createDirectory(createDirectoryDto);
  }

  @Patch(':id')
  updateDirectory(
    @Param('id') id: string,
    @Body() updateDirectotyDto: UpdateDirectoryDto,
  ) {
    return this.directoriesService.updateDirectory(id, updateDirectotyDto);
  }

  @Delete(':id')
  deleteDirectory(@Param('id') id: string) {
    return this.directoriesService.deleteDirectory(id);
  }
}
