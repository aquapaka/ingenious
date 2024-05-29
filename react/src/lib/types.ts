export type Note = {
  _id: string;
  icon: string;
  tags: string[];
  title: string;
  content: string;
};

export type Directory = {
  _id: string;
  icon: string;
  title: string;
  directories: Directory[];
  notes: Note[];
};
