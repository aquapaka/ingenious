import { Accordion } from '@/components/ui/accordion';
import { useGetMainDirectoryQuery } from '@/services/main-service';
import { Bug, Ghost, Loader2 } from 'lucide-react';
import CreateNewDirectoryButton from './components/create-new-directory-button';
import CreateNewNoteButton from './components/create-new-note-button';
import DirectoryAccordion from './components/directory-accodion';
import TrashBin from './components/trash-bin';
import SearchAndFilter from './components/search-and-filter';

export default function DirectoriesPanel() {
  const { data, isLoading, isError, error } = useGetMainDirectoryQuery(undefined);

  if (isError) console.log(error);

  return (
    <div className="h-screen overflow-auto flex flex-col w-full justify-between p-4">
      <div className="flex justify-between items-center gap-1 mb-2">
        <h1 className="font-bold">Notes</h1>
        <div className="flex">
          <CreateNewNoteButton />
          <CreateNewDirectoryButton />
        </div>
      </div>
      <div className="mb-4">
        <SearchAndFilter />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center grow">
          <Loader2 className="inline animate-spin mr-2" size={16} /> Loading...
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center grow">
          <Bug className="inline mr-2" size={16} /> Error while loading notes
        </div>
      ) : (
        data && (
          <Accordion type="multiple" className="grow flex flex-col justify-between">
            {!data.directories.length && !data.notes.filter((note) => !note.isTrash).length ? (
              <div className="grow flex justify-center items-center italic text-secondary-foreground">
                <Ghost className="inline mr-2" size={16} /> It's empty here
              </div>
            ) : (
              <DirectoryAccordion directory={data!} />
            )}
            <TrashBin directory={data} />
          </Accordion>
        )
      )}
    </div>
  );
}
