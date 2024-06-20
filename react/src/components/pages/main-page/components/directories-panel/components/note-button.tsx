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
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Note } from '@/lib/types';
import { useDeleteNoteMutation, useUpdateNoteMutation } from '@/services/main-service';
import { Sparkle, StickyNote, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FAVORITE_COLOR } from '../../../../../../const/const';
import ToggleFavoriteButton from '../../toggle-favorite-button';

function DeleteAlertDialogContent(props: { note: Note }) {
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

function ButtonContextMenuContent() {
  return (
    <ContextMenuContent className="w-64">
      <ContextMenuItem asChild>
        <AlertDialogTrigger className="w-full">
          <Trash2 size={16} className="mr-2" /> Delete
        </AlertDialogTrigger>
      </ContextMenuItem>
    </ContextMenuContent>
  );
}

export default function NoteButton({ note }: { note: Note }) {
  const { id } = useParams();

  return (
    <ContextMenu>
      <AlertDialog>
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
                        <Sparkle fill={FAVORITE_COLOR} className="lucide-xs lucide-filled" />
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
        {/* Contents */}
        <ButtonContextMenuContent />
        <DeleteAlertDialogContent note={note} />
      </AlertDialog>
    </ContextMenu>
  );
}
