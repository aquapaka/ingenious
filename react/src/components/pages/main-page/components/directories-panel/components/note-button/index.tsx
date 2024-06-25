import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Note, Tag } from '@/lib/types';
import {
  useDeleteNoteMutation,
  useDeleteTagMutation,
  useGetUserDataQuery,
  useGetUserDirectoriesQuery,
  useUpdateNoteMutation,
} from '@/services/main-service';
import { CirclePlus, Folder, PencilLine, Sparkles, StickyNote, TagIcon, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FAVORITE_COLOR, TAG_BACKGROUND_OPACITY_HEX_CODE } from '../../../../../../../const/const';
import { Badge } from '../../../../../../ui/badge';
import { Popover, PopoverTrigger } from '../../../../../../ui/popover';
import ToggleFavoriteButton from '../../../toggle-favorite-button';
import CreateTagPopoverContent from './components/create-tag-popover-content';
import { Directory } from '@/lib/types';

enum Dialogs {
  deleteNote = 'deleteNote',
}
function DeleteNoteDialogContent(props: { note: Note }) {
  const { note } = props;
  const [deleteNote, { isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteNoteMutation();
  const [updateNote, { isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateNoteMutation();

  function handleDeleteConfirm() {
    if (note.isInTrash) deleteNote(note._id);
    else
      updateNote({
        id: note._id,
        note: {
          isInTrash: true,
        },
      });
  }

  useEffect(() => {
    if (isDeleteError || isUpdateError) {
      toast.error('Uh Oh! Something went wrong 😳', {
        description: "Note hasn't been deleted",
      });
    }
    if (isDeleteSuccess) {
      toast.success('Note has been deleted for good', {
        description: 'Bye bye note!',
      });
    } else if (isUpdateSuccess) {
      toast.success('Note has been moved into trash bin', {
        description: 'You can always restore it there',
      });
    }
  }, [isDeleteError, isDeleteSuccess, isUpdateError, isUpdateSuccess]);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{!note.isInTrash ? 'Moving note to trash?' : 'Are you absolutely sure?'}</AlertDialogTitle>
        <AlertDialogDescription>
          {!note.isInTrash ? (
            <>
              You are about to moving
              <strong className="text-foreground">
                {' '}
                <StickyNote className="inline-block mb-1" /> {note.title}
              </strong>{' '}
              into{' '}
              <strong className="text-foreground">
                {' '}
                <Trash2 className="inline-block mb-1" /> Trash
              </strong>
              .
            </>
          ) : (
            <>
              You are about to delete{' '}
              <strong className="text-foreground">
                <StickyNote className="inline-block mb-1" /> {note.title}
              </strong>
              .
              <br />
              <span className="text-destructive mt-2">This action cannot be undone.</span>
            </>
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteConfirm}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default function NoteButton({ note, showMoreInfo }: { note: Note; showMoreInfo?: boolean }) {
  const { id } = useParams();
  const [currentDialog, setCurrentDialog] = useState<Dialogs>();
  const { data: user } = useGetUserDataQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteTag, { isLoading: isDeletingTag }] = useDeleteTagMutation();
  const { data: directories } = useGetUserDirectoriesQuery();
  const [directory, setDirectory] = useState<Directory | undefined>(undefined);

  function handleSelectTag(e: Event, selectedTag: Tag) {
    e.preventDefault();

    const tagIds = note._tags ? note._tags.map((tag) => tag._id) : [];
    const newTagIds = tagIds.includes(selectedTag._id)
      ? tagIds.filter((tagId) => tagId !== selectedTag._id)
      : [...tagIds, selectedTag._id];

    updateNote({
      id: note._id,
      note: {
        tagIds: newTagIds,
      },
    });
  }

  useEffect(() => {
    if (directories) {
      setDirectory(directories.find((directory) => directory?._id === note._directory));
    }
  }, [directories, note._directory]);

  function handleDeleteTag(tagId: string) {
    if (isDeletingTag) return;
    deleteTag({ id: tagId })
      .then(() => {
        toast.success('Tag deleted');
      })
      .catch(() =>
        toast.error('Uh Oh! Something when wrong 😳', {
          description: 'Error while delete tag',
        }),
      );
  }

  return (
    <ContextMenu>
      <AlertDialog>
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
                    <span>{note.title}</span>
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
            </div>
            <div className="right-2 top-[0.4rem] absolute items-center opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 gap-2 bg-background rounded-md">
              <ToggleFavoriteButton note={note} minimal />
            </div>
          </div>
        </ContextMenuTrigger>
        {/* Context menu Content */}
        <ContextMenuContent className="w-32">
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <TagIcon className="mr-2" />
              Tags
            </ContextMenuSubTrigger>
            <ContextMenuSubContent
              className="w-56"
              onInteractOutside={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => e.preventDefault()}
              onFocusOutside={(e) => e.preventDefault()}
            >
              {user?.allTags.map((tag) => (
                <div className="relative" key={tag._id}>
                  <ContextMenuCheckboxItem
                    checked={note._tags && note._tags.map((tag) => tag._id).includes(tag._id)}
                    onSelect={(e) => handleSelectTag(e, tag)}
                    className="peer duration-200"
                  >
                    <Badge variant="tag" style={{ backgroundColor: tag.color + TAG_BACKGROUND_OPACITY_HEX_CODE }}>
                      {tag.name}
                    </Badge>
                  </ContextMenuCheckboxItem>
                  <div className="absolute right-1 top-[0.3rem] bg-background rounded-md opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 h-[24px]">
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="xs-icon">
                          <PencilLine />
                        </Button>
                      </PopoverTrigger>
                      <CreateTagPopoverContent isUpdate tagToUpdate={tag} />
                    </Popover>
                    <Button
                      variant="ghost"
                      size="xs-icon"
                      onClick={() => handleDeleteTag(tag._id)}
                      disabled={isDeletingTag}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ))}
              <ContextMenuSeparator />
              <Popover modal={true}>
                <PopoverTrigger className="w-full">
                  <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                    <CirclePlus className="mr-2" />
                    Create new tag
                  </ContextMenuItem>
                </PopoverTrigger>
                <CreateTagPopoverContent />
              </Popover>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem asChild>
            <AlertDialogTrigger className="w-full" onClick={() => setCurrentDialog(Dialogs.deleteNote)}>
              <Trash2 className="mr-2" />
              Delete
            </AlertDialogTrigger>
          </ContextMenuItem>
        </ContextMenuContent>
        {/* Dialog Content */}
        {currentDialog === Dialogs.deleteNote && <DeleteNoteDialogContent note={note} />}
      </AlertDialog>
    </ContextMenu>
  );
}
