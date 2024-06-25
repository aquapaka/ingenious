import { toast } from 'sonner';
import { renameNoteFormSchema } from '../../../../../../../../const/form-schemas';
import { Note } from '../../../../../../../../lib/types';
import { useUpdateNoteMutation } from '../../../../../../../../services/main-service';
import { PopoverClose, PopoverContent } from '@radix-ui/react-popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../../../../../ui/form';
import { PencilLine } from 'lucide-react';
import { Input } from '../../../../../../../ui/input';
import { Button } from '../../../../../../../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function RenameNotePopoverContent(props: { note: Note }) {
  const { note } = props;
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const form = useForm<z.infer<typeof renameNoteFormSchema>>({
    resolver: zodResolver(renameNoteFormSchema),
    defaultValues: {
      title: note.title,
    },
  });

  function onSubmit(values: z.infer<typeof renameNoteFormSchema>) {
    if (isUpdating) return;

    updateNote({
      id: note._id,
      note: {
        title: values.title,
      },
    })
      .then(() => {
        toast.success('Update note title successfully');
      })
      .catch(() => {
        toast.error('Uh oh! Something when wrong 😳', {
          description: "Note title hasn't been updated yet",
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
              <p className="font-medium">Rename note</p>
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
