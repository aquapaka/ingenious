import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Directory, Note } from '@/lib/types';
import { useAddDirectoryMutation, useAddNoteMutation, useGetMainDirectoryQuery } from '@/services/main-service';
import { FilePen, Folder, FolderPen, Ghost, Loader2, StickyNote } from 'lucide-react';
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
        <span className="pl-4">{note.icon ? note.icon : <StickyNote size={16} />}</span>
        <span className="pl-2 overflow-hidden">{note.title}</span>
      </NavLink>
    </Button>
  );
}

function NoteList({ notes }: { notes: Note[] }) {
  return (
    <div className="flex flex-col gap-1 pl-4">
      {notes.map((note) => (
        <div key={note._id}>
          <NoteButton note={note} />
        </div>
      ))}
    </div>
  );
}

function DirectoryList({ directory }: { directory: Directory }) {
  return (
    <div>
      {/* Display all child directory */}
      {directory.directories.map((directory) => (
        <div key={directory._id}>
          <AccordionItem className="pl-4 relative" value={directory._id}>
            <div className="peer">
              <AccordionTrigger className="hover:bg-secondary rounded-md yo">
                <div className="flex items-center">
                  {directory.icon ? directory.icon : <Folder size={16} />}
                  <span className="pl-2">{directory.title}</span>
                </div>
              </AccordionTrigger>
            </div>
            <div className="right-2 top-[0.4rem] absolute items-center opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 gap-2 bg-background rounded-md">
              <CreateNewNoteButton small parentDirectoryId={directory._id} />
              <CreateNewDirectoryButton small parentDirectoryId={directory._id} />
            </div>
            <AccordionContent>
              <DirectoryList directory={directory} />
              <div className="h-1"></div>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
      {/* Display all child notes in this directory*/}
      <NoteList notes={directory.notes} />
    </div>
  );
}

function CreateNewNoteButton(props: { small?: boolean; parentDirectoryId?: string }) {
  const { small, parentDirectoryId } = props;
  const [addNewNote, { isLoading: isAddingNote }] = useAddNoteMutation();
  const navigate = useNavigate();

  function handleCreateNewNote(event: React.MouseEvent) {
    event.stopPropagation();
    const note: Omit<Note, '_id'> & { parentDirectoryId?: string } = {
      icon: '',
      tags: [],
      title: 'New Note',
      content: '',
      parentDirectoryId,
    };
    addNewNote(note).then(({ data }) => {
      if (data) navigate(`/notes/${data._id}`);
    });
  }
  return (
    <Button variant="ghost" size={small ? 'sm-icon' : 'icon'} onClick={handleCreateNewNote} disabled={isAddingNote}>
      <FilePen size={small ? 14 : 16} strokeWidth={2} className="text-primary" />
    </Button>
  );
}

function CreateNewDirectoryButton(props: { small?: boolean; parentDirectoryId?: string }) {
  const { small, parentDirectoryId } = props;
  const [addNewDorectory, { isLoading: isAddingDirectory }] = useAddDirectoryMutation();

  function handleCreateNewDirectory(event: React.MouseEvent) {
    event.stopPropagation();
    const directory: Omit<Directory, '_id' | 'directories' | 'notes'> & { parentDirectoryId?: string } = {
      icon: '',
      title: 'New directory',
      parentDirectoryId,
    };
    addNewDorectory(directory);
  }
  return (
    <Button
      variant="ghost"
      size={small ? 'sm-icon' : 'icon'}
      onClick={handleCreateNewDirectory}
      disabled={isAddingDirectory}
    >
      <FolderPen size={small ? 14 : 16} strokeWidth={2} className="text-primary" />
    </Button>
  );
}

export default function DirectoriesPanel() {
  const { data, error, isLoading } = useGetMainDirectoryQuery(undefined);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center gap-1 mb-2">
        <h1 className="font-bold">Notes</h1>
        <div className="flex">
          <CreateNewNoteButton />
          <CreateNewDirectoryButton />
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
        <Accordion type="multiple" className="flex flex-col w-full gap-1">
          <DirectoryList directory={data} />
        </Accordion>
      )}
    </div>
  );
}
