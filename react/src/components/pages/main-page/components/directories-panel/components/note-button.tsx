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
import { useDeleteNoteMutation, useGetUserDataQuery, useUpdateNoteMutation } from '@/services/main-service';
import { CirclePlus, Sparkles, StickyNote, TagIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FAVORITE_COLOR, TAG_BACKGROUND_OPACITY_HEX_CODE } from '../../../../../../const/const';
import { Badge } from '../../../../../ui/badge';
import { Popover, PopoverTrigger } from '../../../../../ui/popover';
import ToggleFavoriteButton from '../../toggle-favorite-button';
import CreateTagPopoverContent from './create-tag-popover-content';

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

export default function NoteButton({ note }: { note: Note }) {
  const { id } = useParams();
  const [currentDialog, setCurrentDialog] = useState<Dialogs>();
  const { data: user } = useGetUserDataQuery();
  const [updateNote] = useUpdateNoteMutation();

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

  return (
    <ContextMenu>
      <AlertDialog>
        <Popover modal={true}>
          <ContextMenuTrigger asChild>
            <div className="relative">
              <div className="peer">
                <Button asChild variant={id === note._id ? 'default' : 'ghost'} className="w-full justify-start">
                  <NavLink to={`/notes/${note._id}`}>
                    <div className={`flex justify-start items-center gap-2`}>
                      <span className="pl-4">
                        <StickyNote size={16} />
                      </span>
                      <span>{note.title}</span>
                      {note.isFavorite && (
                        <span className="pl-1">
                          <Sparkles fill={FAVORITE_COLOR} className="lucide-xs lucide-filled" />
                        </span>
                      )}
                    </div>
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
                className="w-48"
                onInteractOutside={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onFocusOutside={(e) => e.preventDefault()}
              >
                {user?.allTags.map((tag) => (
                  <ContextMenuCheckboxItem
                    key={tag._id}
                    checked={note._tags && note._tags.map((tag) => tag._id).includes(tag._id)}
                    onSelect={(e) => handleSelectTag(e, tag)}
                  >
                    <Badge variant="tag" style={{ backgroundColor: tag.color + TAG_BACKGROUND_OPACITY_HEX_CODE }}>
                      {tag.name}
                    </Badge>
                  </ContextMenuCheckboxItem>
                ))}
                <ContextMenuSeparator />
                <ContextMenuItem asChild onSelect={(e) => e.preventDefault()}>
                  <PopoverTrigger className="w-full">
                    <CirclePlus className="mr-2" />
                    Create new tag
                  </PopoverTrigger>
                </ContextMenuItem>
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
          {/* Popover Content */}
          <CreateTagPopoverContent />
        </Popover>
      </AlertDialog>
    </ContextMenu>
  );
}
