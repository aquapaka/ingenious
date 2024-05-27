import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Directory, Note } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findNoteInDirectory(directory: Directory, id: string): Note | null {
  for (const note of directory.notes) {
    if (note.id === id) return note;
  }

  for (const dir of directory.directories) {
    return findNoteInDirectory(dir, id);
  }

  return null;
}
