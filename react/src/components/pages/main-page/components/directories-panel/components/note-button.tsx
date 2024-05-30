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
import { useDeleteNoteMutation } from '@/services/main-service';
import { PencilLine, StickyNote, Trash2 } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';

function DeleteAlertDialogContent(props: { note: Note }) {
  const { note } = props;
  const [deleteNote] = useDeleteNoteMutation();

  function handleDeleteConfirm() {
    deleteNote(note._id);
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You are about to delete <strong className="text-foreground">{`${note.icon} ${note.title}`}</strong>. This
          action cannot be undone.
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
      <ContextMenuItem>
        <PencilLine size={16} className="mr-2" />
        Rename
      </ContextMenuItem>
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
          <Button asChild variant={id === note._id ? 'secondary' : 'ghost'} className="w-full justify-start">
            <NavLink to={`/notes/${note._id}`}>
              <span className="pl-4">{note.icon ? note.icon : <StickyNote size={16} />}</span>
              <span className="pl-2 overflow-hidden">{note.title}</span>
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
