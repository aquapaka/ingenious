import { Accordion } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { useGetUserDataQuery } from '@/services/main-service';
import { Bug, Ghost, Loader2, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import TagsInput from 'react-tagsinput';
import { User } from '../../../../../lib/types';
import CreateNewDirectoryButton from './components/create-new-directory-button';
import CreateNewNoteButton from './components/create-new-note-button';
import DirectoryAccordion from './components/directory-accodion';
import NoteButton from './components/note-button';
import TrashBin from './components/trash-bin';

export default function DirectoriesPanel() {
  const { data, isLoading, isError, isSuccess } = useGetUserDataQuery();
  const [userData, setUserData] = useState<User | null>(null);
  const { allDirectories, allNotes, inTrashNotes } = userData || {};
  const [searchTitle, setSearchTitle] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setUserData(data);
    }
  }, [allDirectories, data, isSuccess]);

  return (
    <div className="h-screen overflow-auto flex flex-col w-full justify-between p-4 pt-2">
      <div className="flex justify-between items-center gap-1 mb-2">
        <h1 className="font-bold">Ingenious</h1>
        <div className="flex">
          <CreateNewNoteButton />
          <CreateNewDirectoryButton />
        </div>
      </div>
      <div className="mb-3">
        <Input
          className="mb-2 placeholder:italic text-xs"
          type="text"
          placeholder="search note by title..."
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <div className="flex">
          <div className="flex items-center px-2">
            <Tag size={16} />
          </div>
          <TagsInput
            value={filterTags}
            inputProps={{ placeholder: 'filter by tags...' }}
            onChange={(tags) => setFilterTags(tags)}
          />
        </div>
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
        allDirectories && (
          <Accordion type="multiple" className="grow flex flex-col justify-between">
            {!allNotes?.length ? (
              <div className="grow flex justify-center items-center italic text-secondary-foreground">
                <Ghost className="inline mr-2" size={16} /> It's empty here
              </div>
            ) : searchTitle.length || filterTags.length ? (
              <div>
                {allNotes &&
                  allNotes
                    .filter(
                      (note) =>
                        !note.isInTrash && note.title.toLocaleLowerCase().includes(searchTitle.toLocaleLowerCase()),
                    )
                    .map((note) => (
                      <div key={note._id}>
                        <NoteButton note={note} />
                      </div>
                    ))}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="space-y-1">
                  {allDirectories &&
                    allDirectories.map((directory) => (
                      <div key={directory._id}>
                        <DirectoryAccordion key={directory._id} directory={directory} />
                      </div>
                    ))}
                </div>
                <div className="space-y-1">
                  {allNotes &&
                    allNotes
                      .filter((note) => !note._directory)
                      .map((note) => (
                        <div key={note._id}>
                          <NoteButton note={note} />
                        </div>
                      ))}
                </div>
              </div>
            )}

            {inTrashNotes && <TrashBin inTrashNodes={inTrashNotes} />}
          </Accordion>
        )
      )}
    </div>
  );
}
