import { Accordion } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { useGetUserDataQuery } from '@/services/main-service';
import { Bug, Filter, Ghost, Loader2, Sparkle, Sparkles, TagIcon, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilterTagIds,
  setSearchText,
  toggleFilter,
  toggleFilterFavorite,
  toggleFilterTagId,
} from '../../../../../app/slices/searchAndFilterSlice';
import { RootState } from '../../../../../app/store';
import { FAVORITE_COLOR, TAG_BACKGROUND_OPACITY_HEX_CODE } from '../../../../../const/const';
import { User } from '../../../../../lib/types';
import { Badge } from '../../../../ui/badge';
import { Button } from '../../../../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../ui/dropdown-menu';
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
  const { searchText, isFilterOn, filterTagIds, isFilterFavoriteOn } = useSelector(
    (state: RootState) => state.searchAndFilter,
  );
  const dispatch = useDispatch();
  const filteredNotes = useMemo(
    () =>
      allNotes
        ? allNotes.filter((note) => {
            if (isFilterFavoriteOn && !note.isFavorite) return false;
            if (
              filterTagIds.length &&
              filterTagIds.every((filterTagId) => !note._tags.map((tag) => tag._id).includes(filterTagId))
            )
              return false;
            return !note.isInTrash && note.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
          })
        : [],
    [allNotes, filterTagIds, isFilterFavoriteOn, searchText],
  );
  const isFiltering = searchText.length || (isFilterOn && (filterTagIds.length || isFilterFavoriteOn));

  useEffect(() => {
    if (isSuccess) {
      setUserData(data);
    }
  }, [allDirectories, data, isSuccess]);

  function handleToggleFilterTag(e: Event, tagId: string) {
    e.preventDefault();
    dispatch(toggleFilterTagId(tagId));
  }

  function handleClearFilterTagIds() {
    dispatch(clearFilterTagIds());
  }

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
          <div className="grow relative">
            <Input
              value={searchText}
              className="mb-2 placeholder:italic text-xs"
              type="text"
              placeholder="search note by title..."
              onChange={(e) => dispatch(setSearchText(e.target.value))}
            />
            <div
              className={`absolute right-[0.3rem] top-[0.36rem] ${searchText.trim().length ? 'scale-100' : 'scale-0'} duration-300`}
            >
              <Button variant="outline" size="xs-icon" onClick={() => dispatch(setSearchText(''))}>
                <X />
              </Button>
            </div>
          </div>
          <Button size="icon" variant={isFilterOn ? 'default' : 'outline'} onClick={() => dispatch(toggleFilter())}>
            <Filter />
          </Button>
        </div>
        <div
          className="flex justify-start duration-300 overflow-hidden gap-1"
          style={{ height: isFilterOn ? '32px' : 0 }}
        >
          <Button
            variant={isFilterFavoriteOn ? 'default' : 'outline'}
            size="xs"
            onClick={() => dispatch(toggleFilterFavorite())}
          >
            {isFilterFavoriteOn ? (
              <Sparkles className="lucide-xs mr-1" fill={FAVORITE_COLOR} />
            ) : (
              <Sparkle className="lucide-xs mr-1" />
            )}
            Favorite
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={filterTagIds.length ? 'default' : 'outline'} size="xs">
                <TagIcon className="lucide-xs mr-1" />
                Tags{' '}
                <div className="bg-secondary rounded-full w-4 h-4 aspect-square ml-1 text-foreground">
                  {filterTagIds.length}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right">
              <DropdownMenuItem onClick={() => handleClearFilterTagIds()}>
                <X className="mr-2" />
                Clear
              </DropdownMenuItem>
              {userData?.allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag._id}
                  checked={filterTagIds.includes(tag._id)}
                  onSelect={(e) => handleToggleFilterTag(e, tag._id)}
                >
                  <Badge variant="tag" style={{ backgroundColor: tag.color + TAG_BACKGROUND_OPACITY_HEX_CODE }}>
                    {tag.name}
                  </Badge>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center grow">
          <Loader2 className="inline animate-spin mr-2" size={16} /> Loading notes...
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
            ) : isFiltering ? (
              <div>
                {filteredNotes.length ? (
                  filteredNotes.map((note) => (
                    <div key={note._id}>
                      <NoteButton note={note} showMoreInfo />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center pt-4 text-muted-foreground italic text-sm">
                    <Ghost className="inline mr-2" /> Can't find any note with this filter
                  </div>
                )}
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
