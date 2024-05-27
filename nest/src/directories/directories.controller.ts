import { Controller, Get } from '@nestjs/common';
import { DirectoriesService } from './directories.service';

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  @Get('/main')
  getMainDirectory() {
    return this.directoriesService.getMainDirectory();
  }
}
