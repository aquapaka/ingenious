import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Directory } from '@/lib/types';
import { useDeleteDirectoryMutation } from '@/services/main-service';
import { Folder, Trash2 } from 'lucide-react';
import CreateNewNoteButton from './create-new-note-button';
import NoteButton from './note-button';

function DeleteAlertDialogContent(props: { directory: Directory }) {
  const { directory } = props;
  const [deleteDirectory] = useDeleteDirectoryMutation();

  function handleDeleteConfirm() {
    deleteDirectory(directory._id);
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You are about to delete <strong className="text-foreground">{`${directory.icon} ${directory.title}`}</strong>{' '}
          directory along with all it's sub directories and notes.
          {directory.notes.length ? (
            <span>
              {' '}
              This will move <strong>{directory.notes.length} notes</strong> into trash.
            </span>
          ) : (
            <span> There is no note in this directory.</span>
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

function DirectoryAccordionTriggerButton(props: { directory: Directory }) {
  const { directory } = props;

  return (
    <ContextMenu>
      <AlertDialog>
        <ContextMenuTrigger>
          <AccordionTrigger className="hover:bg-secondary rounded-md group inline-flex">
            <div className="flex gap-2 items-center [&>div]:grow [&>div]:flex [&>div]:justify-between [&>div]:items-center">
              <Folder size={16} />
              <span>{directory.title}</span>
            </div>
          </AccordionTrigger>
        </ContextMenuTrigger>
        {/* Contents */}
        <ButtonContextMenuContent />
        <DeleteAlertDialogContent directory={directory} />
      </AlertDialog>
    </ContextMenu>
  );
}

export default function DirectoryAccordion({ directory }: { directory: Directory }) {
  return (
    <AccordionItem className="relative" value={directory._id}>
      <div className="peer">
        <DirectoryAccordionTriggerButton directory={directory} />
      </div>
      <div className="right-2 top-[0.4rem] absolute items-center opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 gap-2 bg-background rounded-md">
        <CreateNewNoteButton small parentDirectoryId={directory._id} />
      </div>
      <AccordionContent>
        <div className="min-h-1 space-y-1">
          {directory.notes.map((note) => (
            <div key={note._id}>
              <NoteButton note={note} />
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
