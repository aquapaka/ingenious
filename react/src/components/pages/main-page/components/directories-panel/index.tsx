import { Accordion } from '@/components/ui/accordion';
import { useGetMainDirectoryQuery } from '@/services/main-service';
import { Ghost, Loader2 } from 'lucide-react';
import CreateNewDirectoryButton from './components/create-new-directory-button';
import CreateNewNoteButton from './components/create-new-note-button';
import DirectoryAccordion from './components/directory-accodion';

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
          <DirectoryAccordion directory={data} />
        </Accordion>
      )}
    </div>
  );
}
