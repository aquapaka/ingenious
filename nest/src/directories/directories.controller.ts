import { Body, Controller, Get, Post } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Get('/main')
  getMainDirectory() {
    return this.directoriesService.getMainDirectory();
  }

  @Post()
  createDirectory(@Body() createDirectoryDto: CreateDirectoryDto) {
    return this.directoriesService.create(createDirectoryDto);
  }
}
