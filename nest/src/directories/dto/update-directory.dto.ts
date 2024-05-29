import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectoryDto } from './create-directory.dto';

export class UpdateDirectoryDto extends PartialType(CreateDirectoryDto) {}
