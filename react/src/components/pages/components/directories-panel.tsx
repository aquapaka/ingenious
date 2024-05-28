import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Directory, Note } from '@/lib/types';
import { useAddNoteMutation, useGetMainDirectoryQuery } from '@/services/main-service';
import { FilePen, Folder, FolderPen, Ghost, Loader2, StickyNote } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function NoteButton({ note }: { note: Note }) {
  const { id } = useParams();

  return (
    <Button asChild variant={id === note._id ? 'secondary' : 'ghost'} className="w-full justify-start">
      <NavLink
        to={`/notes/${note._id}`}
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
    <ul className="flex flex-col gap-1 pl-2">
      {notes.map((note) => (
        <li key={note._id}>
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
        <AccordionItem key={directory._id} value={directory._id}>
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
  const [addNewNote, { isLoading: isAdding }] = useAddNoteMutation();
  const navigate = useNavigate();

  function handleCreateNewDirectory() {}

  function handleCreateNewNote() {
    const note: Omit<Note, '_id'> = {
      icon: '⭐',
      tags: [],
      title: 'New Note',
      content: 'yo what supp',
    };
    addNewNote(note).then(({ data }) => {
      if (data) navigate(`/notes/${data._id}`);
    });
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center gap-1 mb-2">
        <h1 className="font-bold">Notes</h1>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={handleCreateNewDirectory}>
            <FilePen size={16} strokeWidth={2} className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCreateNewNote} disabled={isAdding}>
            <FolderPen size={16} strokeWidth={2} className="text-primary" />
          </Button>
        </div>
      </div>
      {!data || (!data.directories.length && !data.notes.length) ? (
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
