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
import EditableNoteTitle from '../../editable-note-title';

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
              <div className="pl-4 flex justify-start items-center gap-2 overflow-hidden w-full [&>div]:grow [&>div]:flex [&>div]:justify-between [&>div]:items-center group">
                <span className="">{note.icon ? note.icon : <StickyNote size={16} />}</span>
                <EditableNoteTitle note={note} isShowOnHover />
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
