import { Note } from 'src/notes/schemas/note.schema';
import { Directory } from '../schemas/directory.schema';

export class CreateDirectoryDto {
  readonly icon: string;
  readonly title: string;
  readonly directories: Directory[];
  readonly notes: Note[];
}
