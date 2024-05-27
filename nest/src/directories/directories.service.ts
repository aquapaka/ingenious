import { Injectable } from '@nestjs/common';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Injectable()
export class DirectoriesService {
  create(createDirectoryDto: CreateDirectoryDto) {
    return 'This action adds a new directory';
  }

  findAll() {
    return `This action returns all directories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} directory`;
  }

  update(id: number, updateDirectoryDto: UpdateDirectoryDto) {
    return `This action updates a #${id} directory`;
  }

  remove(id: number) {
    return `This action removes a #${id} directory`;
  }
}
