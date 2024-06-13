export interface User {
  _id: string;
  username: string;
  allNotes: Note[];
  allDirectories: Directory[];
  allTags: Tag[];
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  isInTrash: boolean;
  createdAt: Date;
  updatedAt: Date;
  _tags: string[];
  _directory: Directory;
}

export interface Directory {
  _id: string;
  title: string;
  color: string;
  notes: Note[];
}
