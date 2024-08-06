import {
  clearFilterTagIds,
  setSearchText,
  toggleFilter,
  toggleFilterFavorite,
  toggleFilterTagId,
} from '@/app/slices/searchAndFilterSlice';
import { RootState } from '@/app/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { FAVORITE_COLOR, TAG_BACKGROUND_OPACITY_HEX_CODE } from '@/const/const';
import useKeyCombination from '@/hooks/useKeyCombination';
import { Tag } from '@/lib/types';
import { useGetUserDataQuery } from '@/services/main-service';
import { Filter, Sparkle, Sparkles, TagIcon, X } from 'lucide-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchAndFilter() {
  const { searchText, isFilterOn, filterTagIds, isFilterFavoriteOn } = useSelector(
    (state: RootState) => state.searchAndFilter,
  );
  const { data: userData } = useGetUserDataQuery();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleToggleFilterTag(e: Event, tagId: string) {
    e.preventDefault();
    dispatch(toggleFilterTagId(tagId));
  }

  function handleClearFilterTagIds() {
    dispatch(clearFilterTagIds());
  }

  useKeyCombination(() => inputRef.current && inputRef.current.focus(), true, false, false, 'KeyK');

  return (
    <div className="mb-0">
      <div className="flex gap-1">
        <div className="grow relative">
          <Input
            value={searchText}
            className="mb-2 placeholder:italic text-xs"
            type="text"
            placeholder="search note by title..."
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            ref={inputRef}
          />
          <div
            className={`absolute right-[0.6rem] top-[0.20rem] ${searchText.trim().length ? 'scale-0' : 'scale-100'} duration-200`}
          >
            <Badge variant="secondary">Ctrl + K</Badge>
          </div>
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
            {userData?.allTags.map((tag: Tag) => (
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
  );
}
