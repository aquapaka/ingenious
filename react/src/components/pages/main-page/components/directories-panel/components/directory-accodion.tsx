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
import CreateNewDirectoryButton from './create-new-directory-button';
import CreateNewNoteButton from './create-new-note-button';
import NoteButton from './note-button';
import { useCallback, useMemo } from 'react';

function DeleteAlertDialogContent(props: { directory: Directory }) {
  const { directory } = props;
  const [deleteDirectory] = useDeleteDirectoryMutation();
  const calculateTotalSubNotes = useCallback((directory: Directory) => {
    let totalNotes = 0;

    totalNotes += directory.notes.length;
    for (const subDir of directory.directories) {
      totalNotes += calculateTotalSubNotes(subDir);
    }

    return totalNotes;
  }, []);
  const totalSubNotes = useMemo(() => calculateTotalSubNotes(directory), [calculateTotalSubNotes, directory]);

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
          {totalSubNotes ? (
            <span>
              {' '}
              This will move <strong>{totalSubNotes} notes</strong> into trash.
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
          <AccordionTrigger className="hover:bg-secondary rounded-md">
            <div className="flex items-center">
              {directory.icon ? directory.icon : <Folder size={16} />}
              <span className="pl-2">{directory.title}</span>
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
    <div>
      {/* Display all child directory */}
      {directory.directories.map((directory) => (
        <div key={directory._id}>
          <AccordionItem className="pl-4 relative" value={directory._id}>
            <div className="peer">
              <DirectoryAccordionTriggerButton directory={directory} />
            </div>
            <div className="right-2 top-[0.4rem] absolute items-center opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 gap-2 bg-background rounded-md">
              <CreateNewNoteButton small parentDirectoryId={directory._id} />
              <CreateNewDirectoryButton small parentDirectoryId={directory._id} />
            </div>
            <AccordionContent className="">
              <DirectoryAccordion directory={directory} />
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
      {/* Display all child notes in this directory*/}
      <div className="pl-4">
        {directory.notes
          .filter((note) => !note.isTrash)
          .map((note) => (
            <div key={note._id}>
              <NoteButton note={note} />
            </div>
          ))}
      </div>
    </div>
  );
}
