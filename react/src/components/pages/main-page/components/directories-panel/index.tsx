import { Accordion } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { useGetUserDataQuery } from '@/services/main-service';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Bug, Filter, Ghost, Loader2, Sparkle, Sparkles, TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, toggleFilter, toggleFilterFavorite } from '../../../../../app/slices/searchAndFilterSlice';
import { RootState } from '../../../../../app/store';
import { FAVORITE_COLOR } from '../../../../../const/const';
import { User } from '../../../../../lib/types';
import { Button } from '../../../../ui/button';
import { DropdownMenu, DropdownMenuContent } from '../../../../ui/dropdown-menu';
import CreateNewDirectoryButton from './components/create-new-directory-button';
import CreateNewNoteButton from './components/create-new-note-button';
import DirectoryAccordion from './components/directory-accodion';
import NoteButton from './components/note-button';
import TrashBin from './components/trash-bin';
import { UserDropdownMenu } from './components/user-dropdown-menu';

export default function DirectoriesPanel() {
  const { data, isLoading, isError, isSuccess } = useGetUserDataQuery();
  const [userData, setUserData] = useState<User | null>(null);
  const { allDirectories, allNotes, inTrashNotes } = userData || {};
  const { searchText, isFilterOn, filterTagIds, isFilterFavoriteOn } = useSelector((state: RootState) => state.searchAndFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setUserData(data);
    }
  }, [allDirectories, data, isSuccess]);

  return (
    <div className="h-screen overflow-auto flex flex-col w-full justify-between p-4 pt-2">
      <div className="flex justify-between items-center gap-1 mb-2">
        <UserDropdownMenu />
        <div className="flex">
          <CreateNewNoteButton />
          <CreateNewDirectoryButton />
        </div>
      </div>
      <div className="mb-0">
        <div className="flex gap-1">
          <div className="grow">
            <Input
              className="mb-2 placeholder:italic text-xs"
              type="text"
              placeholder="search note by title..."
              onChange={(e) => dispatch(setSearchText(e.target.value))}
            />
          </div>
          <Button size="icon" variant={isFilterOn ? 'default' : 'outline'} onClick={() => dispatch(toggleFilter())}>
            <Filter />
          </Button>
        </div>
        <div className="flex duration-300 overflow-hidden gap-1" style={{ height: isFilterOn ? '32px' : 0 }}>
          <Button variant={isFilterFavoriteOn ? 'default' : 'outline'} size="xs" onClick={() => dispatch(toggleFilterFavorite())}>
            {isFilterFavoriteOn ? <Sparkles className="lucide-xs mr-1" fill={FAVORITE_COLOR} /> : <Sparkle className="lucide-xs mr-1"/>}
            Favorite
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={filterTagIds.length ? 'default' : 'outline'} size="xs">
                <TagIcon className="lucide-xs mr-1" />
                Tags <div className="bg-secondary rounded-full w-4 h-4 aspect-square ml-1">{filterTagIds.length}</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">yo</DropdownMenuContent>
          </DropdownMenu>
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
            ) : isFilterOn && (searchText.length || filterTagIds.length || isFilterFavoriteOn) ? (
              <div>
                {allNotes &&
                  allNotes
                    .filter(
                      (note) => {
                        if(isFilterFavoriteOn && !note.isFavorite) return false;
                        return !note.isInTrash && note.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
                      }
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
