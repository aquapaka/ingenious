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
import { StickyNote, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'sonner';

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
              <br />.<span className="text-destructive mt-2">This action cannot be undone.</span>
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
          <Button asChild variant={id === note._id ? 'default' : 'ghost'} className="w-full justify-start">
            <NavLink to={`/notes/${note._id}`}>
              <div
                className={`${note._directory ? 'pl-10' : 'pl-4'} flex justify-start items-center gap-2 overflow-hidden w-full [&>div]:grow [&>div]:flex [&>div]:items-center group`}
              >
                <span className="">
                  <StickyNote size={16} />
                </span>
                <span>{note.title}</span>
              </div>
            </NavLink>
          </Button>
        </ContextMenuTrigger>
        {/* Contents */}
        <ButtonContextMenuContent />
        <DeleteAlertDialogContent note={note} />
      </AlertDialog>
    </ContextMenu>
  );
}
