import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Directory, Note } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findNoteInDirectory(id?: string, directory?: Directory): Note | null {
  if (!directory || !id) return null;

  for (const note of directory.notes) {
    if (note._id === id) return note;
  }

  for (const dir of directory.directories) {
    return findNoteInDirectory(id, dir);
  }

  return null;
}
