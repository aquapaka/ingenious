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
import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FindOneParams } from '../validation/findOneParams';
import { ForbiddenError } from '@casl/ability';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Directory } from './schemas/directory.schema';
import { ClsService } from 'nestjs-cls';

@ApiTags('directories')
@Controller('directories')
export class DirectoriesController {
  constructor(
    private readonly directoriesService: DirectoriesService,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly cls: ClsService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getDirectory(@Param() params: FindOneParams) {
    return this.directoriesService.findOneDirectoryById(params.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createDirectory(@Body() createDirectoryDto: CreateDirectoryDto) {
    const user = this.cls.get('user');
    return this.directoriesService.createDirectory(
      createDirectoryDto,
      user._id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateDirectory(
    @Param() params: FindOneParams,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const directoryToUpdate =
        await this.directoriesService.findOneDirectoryById(params.id);

      const checkDirectory = new Directory();
      checkDirectory._owner = directoryToUpdate._owner;

      ForbiddenError.from(ability).throwUnlessCan(
        Action.Update,
        checkDirectory,
      );

      return this.directoriesService.updateDirectory(
        params.id,
        updateDirectoryDto,
      );
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteDirectory(@Param() params: FindOneParams) {
    const user = this.cls.get('user');
    const ability = this.caslAbilityFactory.createForUser(user);

    try {
      const directoryToDelete =
        await this.directoriesService.findOneDirectoryById(params.id);

      const checkDirectory = new Directory();
      checkDirectory._owner = directoryToDelete._owner;

      ForbiddenError.from(ability).throwUnlessCan(
        Action.Delete,
        checkDirectory,
      );

      return this.directoriesService.deleteDirectory(params.id);
    } catch (error) {
      if (error instanceof ForbiddenError)
        throw new ForbiddenException(error.message);
    }
  }
}
