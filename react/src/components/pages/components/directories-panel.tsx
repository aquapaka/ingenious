import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Directory, Note } from '@/lib/types';
import { useGetMainDirectoryQuery } from '@/services/main-service';
import { FilePen, Folder, FolderPen, Ghost, Loader2, StickyNote } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function NoteButton({ note }: { note: Note }) {
  return (
    <Button asChild variant="ghost" className="w-full justify-start">
      <NavLink
        to={`/note/${note.id}`}
        className={({ isActive, isPending, isTransitioning }) =>
          [isPending ? 'pending' : '', isActive ? 'active' : '', isTransitioning ? 'transitioning' : ''].join(' ')
        }
      >
        {note.icon ? note.icon : <StickyNote size={16} />}
        <span className="pl-2">{note.title}</span>
      </NavLink>
    </Button>
  );
}

function NoteList({ notes }: { notes: Note[] }) {
  return (
    <ul className="flex flex-col gap-1 pl-4">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteButton note={note} />
        </li>
      ))}
    </ul>
  );
}

function DirectoryList({ directory }: { directory: Directory }) {
  return (
    <Accordion type="multiple" className="flex flex-col w-full gap-1">
      {/* Display all child directory */}
      {directory.directories.map((directory) => (
        <AccordionItem key={directory.id} value={directory.id}>
          <AccordionTrigger>
            {directory.icon ? directory.icon : <Folder size={16} />}
            <span className="pl-2">{directory.title}</span>
          </AccordionTrigger>
          <AccordionContent>
            <DirectoryList directory={directory} />
          </AccordionContent>
        </AccordionItem>
      ))}
      {/* Display all child notes in this directory*/}
      <NoteList notes={directory.notes} />
    </Accordion>
  );
}

export default function DirectoriesPanel() {
  const { data, error, isLoading } = useGetMainDirectoryQuery(undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 gap-1">
        <h1 className="font-bold">Notes</h1>
        <div className="flex">
          <Button asChild variant="ghost" size="icon">
            <NavLink to="/note/new">
              <FilePen size={16} strokeWidth={2} className="text-primary" />
            </NavLink>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <NavLink to="/note/new">
              <FolderPen size={16} strokeWidth={2} className="text-primary" />
            </NavLink>
          </Button>
        </div>
      </div>
      {!data || !data.directories.length || !data.notes.length ? (
        <div className="h-[80%] flex justify-center items-center grow">
          {isLoading ? (
            <>
              <Loader2 className="inline animate-spin mr-2" size={16} /> Loading...
            </>
          ) : (
            <>
              <Ghost className="inline mr-2" size={16} /> {error ? 'Error while loading notes' : 'No notes were found'}
            </>
          )}
        </div>
      ) : (
        <DirectoryList directory={data} />
      )}
    </div>
  );
}
