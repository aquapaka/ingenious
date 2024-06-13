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
  isTrash: boolean;
  tags: string[];
}

export interface Directory {
  _id: string;
  title: string;
  color: string;
  notes: Note[];
}
