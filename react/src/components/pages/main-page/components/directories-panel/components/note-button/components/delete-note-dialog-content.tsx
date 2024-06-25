import { StickyNote, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Note } from '../../../../../../../../lib/types';
import { useDeleteNoteMutation, useUpdateNoteMutation } from '../../../../../../../../services/main-service';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../../../../ui/alert-dialog';

export default function DeleteNoteDialogContent(props: { note: Note }) {
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
