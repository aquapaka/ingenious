import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Directory, Note } from '@/lib/types';
import { useGetUserDirectoriesQuery } from '@/services/main-service';
import { Folder, Sparkles, StickyNote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Dialogs } from '../../../../../../../app/slices/uiSlice';
import { FAVORITE_COLOR, TAG_BACKGROUND_OPACITY_HEX_CODE } from '../../../../../../../const/const';
import { Badge } from '../../../../../../ui/badge';
import { Popover, PopoverAnchor } from '../../../../../../ui/popover';
import ToggleFavoriteButton from '../../../toggle-favorite-button';
import DeleteNoteDialogContent from './components/delete-note-dialog-content';
import NoteButtonContextMenuContent from './components/note-button-context-menu-content';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../app/store';
import { AlertDialog } from '../../../../../../ui/alert-dialog';
import RenameNotePopoverContent from './components/rename-note-popover-content';
import HighlightText from './components/highlight-text';
import { RangeTuple } from 'fuse.js';

export default function NoteButton({
  note,
  showMoreInfo,
  highlightIndices,
}: {
  note: Note;
  showMoreInfo?: boolean;
  highlightIndices?: readonly RangeTuple[];
}) {
  const { id } = useParams();
  const { data: directories } = useGetUserDirectoriesQuery();
  const [directory, setDirectory] = useState<Directory | undefined>(undefined);
  const currentDialog = useSelector((state: RootState) => state.ui.currentDialog);

  useEffect(() => {
    if (directories) {
      setDirectory(directories.find((directory) => directory?._id === note._directory));
    }
  }, [directories, note._directory]);

  return (
    <AlertDialog>
      <Popover modal>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="relative overflow-hidden">
              <div className="peer">
                <Button
                  asChild
                  variant={id === note._id ? 'default' : 'ghost'}
                  className="w-full h-auto flex flex-col items-start gap-1"
                >
                  <NavLink to={`/notes/${note._id}`}>
                    {showMoreInfo && directory && (
                      <div className="flex gap-1 items-center text-nowrap text-xs italic opacity-80">
                        <Folder className="lucide-filled lucide-xs" fill={directory.color} />
                        <span>{directory.title}</span>
                      </div>
                    )}
                    <div className={`flex justify-start items-center gap-2`}>
                      <span className={showMoreInfo ? '' : 'pl-4'}>
                        <StickyNote size={16} />
                      </span>
                      <span>
                        {highlightIndices ? (
                          <HighlightText text={note.title} highlightIndices={highlightIndices} />
                        ) : (
                          note.title
                        )}
                      </span>
                      {note.isFavorite && (
                        <span className="pl-1">
                          <Sparkles fill={FAVORITE_COLOR} className="lucide-xs lucide-filled" />
                        </span>
                      )}
                    </div>
                    {showMoreInfo && (
                      <div className="flex gap-1 flex-wrap">
                        {note._tags?.map((tag) => (
                          <Badge
                            key={tag._id}
                            variant="tag"
                            style={{ backgroundColor: tag.color + TAG_BACKGROUND_OPACITY_HEX_CODE }}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </NavLink>
                </Button>
                <PopoverAnchor />
              </div>
              <div className="right-2 top-[0.4rem] absolute items-center opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 gap-2 bg-background rounded-md">
                <ToggleFavoriteButton note={note} minimal />
              </div>
            </div>
          </ContextMenuTrigger>
          {/* Context menu Content */}
          <NoteButtonContextMenuContent note={note} />
          <RenameNotePopoverContent note={note} />
          {/* Dialog Content */}
          {currentDialog === Dialogs.deleteNote && <DeleteNoteDialogContent note={note} />}
        </ContextMenu>
      </Popover>
    </AlertDialog>
  );
}
