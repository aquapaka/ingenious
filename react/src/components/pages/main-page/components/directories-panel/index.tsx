import { Accordion } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Directory, Note } from '@/lib/types';
import { useGetMainDirectoryQuery } from '@/services/main-service';
import { Bug, Ghost, Loader2, Tag } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import TagsInput from 'react-tagsinput';
import CreateNewDirectoryButton from './components/create-new-directory-button';
import CreateNewNoteButton from './components/create-new-note-button';
import DirectoryAccordion from './components/directory-accodion';
import NoteButton from './components/note-button';
import TrashBin from './components/trash-bin';

export default function DirectoriesPanel() {
  const { data, isLoading, isError } = useGetMainDirectoryQuery(undefined);
  const [searchTitle, setSearchTitle] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);

  const filterNotes = useCallback((directory: Directory | undefined, searchTitle: string, filterTags: string[]) => {
    if (!directory) return [];

    const filteredNotes: Note[] = [];

    directory.notes.forEach((note) => {
      if (
        !note.isTrash &&
        note.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        filterTags.every((tag) => note.tags.includes(tag))
      )
        filteredNotes.push(note);
    });
    directory.directories.forEach((dir) => {
      filteredNotes.push(...filterNotes(dir, searchTitle, filterTags));
    });

    return filteredNotes;
  }, []);

  const filteredNotes = useMemo(
    () => filterNotes(data, searchTitle, filterTags),
    [filterNotes, data, searchTitle, filterTags],
  );

  return (
    <div className="h-screen overflow-auto flex flex-col w-full justify-between p-4">
      <div className="flex justify-between items-center gap-1 mb-2">
        <h1 className="font-bold">Notes</h1>
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
        data && (
          <Accordion type="multiple" className="grow flex flex-col justify-between">
            {!data.directories.length && !data.notes.filter((note) => !note.isTrash).length ? (
              <div className="grow flex justify-center items-center italic text-secondary-foreground">
                <Ghost className="inline mr-2" size={16} /> It's empty here
              </div>
            ) : searchTitle.length || filterTags.length ? (
              <div>
                {filteredNotes
                  .filter((note) => !note.isTrash)
                  .map((note) => (
                    <div key={note._id}>
                      <NoteButton note={note} />
                    </div>
                  ))}
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
