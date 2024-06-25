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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Directory } from '@/lib/types';
import { useDeleteDirectoryMutation, useUpdateDirectoryMutation } from '@/services/main-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { Folder, Ghost, Palette, PencilLine, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { renameDirectoryFormSchema } from '../../../../../../../const/form-schemas';
import { Button } from '../../../../../../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../../../../ui/form';
import { Input } from '../../../../../../ui/input';
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../../../../../../ui/popover';
import ColorSelector from '../color-selector';
import CreateNewNoteButton from '../create-new-note-button';
import NoteButton from '../note-button';

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
          You are about to delete <strong className="text-foreground">{directory.title}</strong> directory.
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

function ButtonContextMenuContent(props: { directory: Directory }) {
  const { directory } = props;
  const [updateDirectory, { isLoading, isSuccess }] = useUpdateDirectoryMutation();

  function handleSelectColor(color: string) {
    updateDirectory({
      id: directory._id,
      directory: {
        color: color,
      },
    });
  }

  useEffect(() => {
    if (isSuccess) toast.success('Changed directory color');
  }, [isSuccess]);

  return (
    <ContextMenuContent className="w-48">
      <ContextMenuSub>
        <PopoverTrigger asChild>
          <ContextMenuItem>
            <PencilLine className="mr-2" />
            Rename
          </ContextMenuItem>
        </PopoverTrigger>
        <ContextMenuSubTrigger>
          <Palette className="mr-2" />
          Change color
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="p-3">
          <ColorSelector onColorSelect={handleSelectColor} disabled={isLoading} />
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuItem asChild>
        <AlertDialogTrigger className="w-full">
          <Trash2 className="mr-2" /> Delete
        </AlertDialogTrigger>
      </ContextMenuItem>
    </ContextMenuContent>
  );
}

function RenamePopoverContent(props: { directory: Directory }) {
  const { directory } = props;
  const [updateDirectory, { isLoading: isUpdating }] = useUpdateDirectoryMutation();

  const form = useForm<z.infer<typeof renameDirectoryFormSchema>>({
    resolver: zodResolver(renameDirectoryFormSchema),
    defaultValues: {
      title: directory.title,
    },
  });

  function onSubmit(values: z.infer<typeof renameDirectoryFormSchema>) {
    if (isUpdating) return;

    updateDirectory({
      id: directory._id,
      directory: {
        title: values.title,
      },
    })
      .then(() => {
        toast.success('Update directory title successfully');
      })
      .catch(() => {
        toast.error('Uh oh! Something when wrong 😳', {
          description: "Directory title hasn't been updated yet",
        });
      });
  }

  return (
    <PopoverContent align="start" sideOffset={8}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-col-12 gap-2 items-end">
            <div className="col-span-12 flex items-center">
              <PencilLine className="mr-2" />
              <p className="font-medium">Rename directory</p>
            </div>
            <div className="col-span-9">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>Enter new title</FormDescription>
                    <FormMessage />
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <PopoverClose asChild>
                <Button type="submit" disabled={isUpdating}>
                  Confirm
                </Button>
              </PopoverClose>
            </div>
          </div>
        </form>
      </Form>
    </PopoverContent>
  );
}

function DirectoryAccordionTriggerButton(props: { directory: Directory }) {
  const { directory } = props;

  return (
    <Popover modal>
      <ContextMenu>
        <AlertDialog>
          <ContextMenuTrigger>
            <AccordionTrigger className={`hover:bg-secondary rounded-md group inline-flex overflow-hidden`}>
              <PopoverAnchor />
              <div className="flex gap-2 items-center text-nowrap">
                <Folder className="lucide-filled" fill={directory.color} />
                <span>{directory.title}</span>
              </div>
            </AccordionTrigger>
          </ContextMenuTrigger>
          {/* Contents */}
          <DeleteAlertDialogContent directory={directory} />
          <ButtonContextMenuContent directory={directory} />
          <RenamePopoverContent directory={directory} />
        </AlertDialog>
      </ContextMenu>
    </Popover>
  );
}

const TEN_PERCENT_OPACITY_HEX_CODE = '1A';

export default function DirectoryAccordion({ directory }: { directory: Directory }) {
  return (
    <AccordionItem
      className={`relative rounded-md`}
      style={{ backgroundColor: directory.color + TEN_PERCENT_OPACITY_HEX_CODE }}
      value={directory._id}
    >
      <div className="peer">
        <DirectoryAccordionTriggerButton directory={directory} />
      </div>
      <div className="right-2 top-[0.4rem] absolute items-center opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 gap-2 bg-background rounded-md">
        <CreateNewNoteButton small parentDirectoryId={directory._id} />
      </div>
      <AccordionContent>
        <div className="space-y-1">
          {directory.notes.map((note) => (
            <div key={note._id}>
              <NoteButton note={note} />
            </div>
          ))}
          {!directory.notes.length && (
            <div className="flex justify-center items-center p-4 italic text-xs text-muted-foreground">
              <Ghost className="mr-1 lucide-sm" />
              This directory is empty
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
