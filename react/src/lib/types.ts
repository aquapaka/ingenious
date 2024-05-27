export type Note = {
  id: string;
  icon: string;
  title: string;
  content: string;
};

export type Directory = {
  id: string;
  icon: string;
  title: string;
  directories: Directory[];
  notes: Note[];
};
