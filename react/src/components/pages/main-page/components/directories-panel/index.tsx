import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Directory } from '@/lib/types';
import { useGetMainDirectoryQuery } from '@/services/main-service';
import { Folder, Ghost, Loader2 } from 'lucide-react';
import CreateNewDirectoryButton from './components/create-new-directory-button';
import CreateNewNoteButton from './components/create-new-note-button';
import NoteButton from './components/note-button';

function DirectoryContent({ directory }: { directory: Directory }) {
  return (
    <div>
      {/* Display all child directory */}
      {directory.directories.map((directory) => (
        <div key={directory._id}>
          <AccordionItem className="pl-4 relative" value={directory._id}>
            <div className="peer">
              <AccordionTrigger className="hover:bg-secondary rounded-md">
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
              <DirectoryContent directory={directory} />
              <div className="h-1"></div>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
      {/* Display all child notes in this directory*/}
      <div className="pl-4">
        {directory.notes.map((note) => (
          <div key={note._id}>
            <NoteButton note={note} />
          </div>
        ))}
      </div>
    </div>
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
          <DirectoryContent directory={data} />
        </Accordion>
      )}
    </div>
  );
}
