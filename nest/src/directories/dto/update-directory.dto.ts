import { PartialType } from '@nestjs/mapped-types';
import { Directory } from '../schemas/directory.schema';

export class UpdateDirectoryDto extends PartialType(Directory) {}
