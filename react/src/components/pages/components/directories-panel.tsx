import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { AccordionContent } from '@radix-ui/react-accordion';
import { NavLink } from 'react-router-dom';

type Note = {
  id: string;
  icon: string;
  title: string;
};

type Directory = {
  id: string;
  icon: string;
  title: string;
  notes: Note[];
};

const notesMock: Note[] = [
  {
    id: 'note-1',
    icon: '',
    title: 'How to swim',
  },
  {
    id: 'note-2',
    icon: '',
    title: 'How to swim',
  },
];

const directoriesMock: Directory[] = [
  {
    id: 'id-1',
    icon: '🍑',
    title: 'Fruits',
    notes: notesMock,
  },
  {
    id: 'id-2',
    icon: '📕',
    title: 'Books',
    notes: notesMock,
  },
];

function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {notes.map((note) => (
        <li>
          <Button asChild variant="ghost" className="w-full justify-start">
            <NavLink
              to={`/note/${note.id}`}
              className={({ isActive, isPending, isTransitioning }) =>
                [isPending ? 'pending' : '', isActive ? 'active' : '', isTransitioning ? 'transitioning' : ''].join(' ')
              }
            >
              {note.icon} {note.title}
            </NavLink>
          </Button>
        </li>
      ))}
    </ul>
  );
}

function DirectoriesList({ directories }: { directories: Directory[] }) {
  return (
    <Accordion type="multiple" className="flex flex-col w-full p-4 gap-2">
      <h1 className="font-bold">Notes</h1>
      {directories.map((directory) => (
        <AccordionItem key={directory.id} value={directory.id}>
          <AccordionTrigger>
            {directory.icon} {directory.title}
          </AccordionTrigger>
          <AccordionContent>
            <NoteList notes={directory.notes} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function DirectoriesPanel() {
  return (
    <div className="min-h-screen">
      <DirectoriesList directories={directoriesMock} />
    </div>
  );
}
