import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Directory, Note } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import NoteButton from './note-button';

export default function TrashBin(props: { directory: Directory }) {
  const { directory } = props;
  const filterNotesInTrash = useCallback((directory: Directory) => {
    const trashNotes: Note[] = [];

    directory.notes.forEach((note) => {
      if (note.isTrash) trashNotes.push(note);
    });
    directory.directories.forEach((dir) => {
      trashNotes.push(...filterNotesInTrash(dir));
    });

    return trashNotes;
  }, []);
  const notesInTrash = useMemo(() => filterNotesInTrash(directory), [filterNotesInTrash, directory]);

  return (
    <AccordionItem value="trash" className="w-full overflow-scroll">
      <AccordionTrigger className="hover:bg-secondary rounded-md">
        <div className="flex items-center">
          <Trash2 size={16} />
          <span className="pl-2">Trash</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-4">
          {notesInTrash.map((note) => (
            <div key={note._id}>
              <NoteButton note={note} />
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
