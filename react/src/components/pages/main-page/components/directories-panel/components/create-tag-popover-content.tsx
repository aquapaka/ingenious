import { zodResolver } from '@hookform/resolvers/zod';
import { Palette } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { COLORS, TAG_BACKGROUND_OPACITY_HEX_CODE } from '../../../../../../const/const';
import { useAddTagMutation, useGetUserDataQuery } from '../../../../../../services/main-service';
import { Badge } from '../../../../../ui/badge';
import { Button } from '../../../../../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../../../ui/form';
import { Input } from '../../../../../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../../../../ui/popover';
import ColorSelector from './color-selector';

const createTagFormSchema = z.object({
  tagName: z.string().trim().min(1, 'Yo it empty!').max(16, 'Tag too long'),
  tagColor: z.string().trim().min(1, 'Tag color not selected'),
});

export default function CreateTagPopoverContent() {
  const [addTag, { isSuccess: isAddTagSuccess, isError: isAddTagError }] = useAddTagMutation();
  const {data: user} = useGetUserDataQuery();

  const form = useForm<z.infer<typeof createTagFormSchema>>({
    resolver: zodResolver(createTagFormSchema),
    defaultValues: {
      tagName: '',
      tagColor: COLORS[0],
    },
  });
  const formValues = useWatch({ control: form.control });

  function onSubmit(values: z.infer<typeof createTagFormSchema>) {
    // Check if tag already exist
    if (user?.allTags.map(tag => tag.name).includes(values.tagName)) {
      form.setError('tagName', {
        message: 'This tag already exist',
        type: 'custom'
      });
      return;
    }
    addTag({ name: values.tagName, color: values.tagColor });
  }

  useEffect(() => {
    if (isAddTagError) {
      toast.error('Uh Oh! Something went wrong 😳', {
        description: "Tag hasn't been created",
      });
    }
    if (isAddTagSuccess) {
      toast.success('New tag created');
      form.reset();
    }
  }, [form, isAddTagError, isAddTagSuccess]);

  return (
    <PopoverContent>
      <div className="grid gap-2">
        <div className="flex justify-between">
          <h4 className="font-medium leading-none">Create new tag</h4>
          <Badge variant="tag" style={{ backgroundColor: formValues.tagColor + TAG_BACKGROUND_OPACITY_HEX_CODE }}>
            {formValues.tagName?.length ? formValues.tagName : 'cool tag'}
          </Badge>
          <div></div>
        </div>
        <div className="grid gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-6 items-end gap-1">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="tagName"
                    render={({ field }) => (
                      <FormItem>
                        <FormDescription>Enter tag name</FormDescription>
                        <FormMessage />
                        <FormControl>
                          <Input id="width" placeholder="tag name..." className="h-8" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm-icon" className="col-span-1">
                      <Palette />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <ColorSelector onColorSelect={(color) => form.setValue('tagColor', color)} />
                  </PopoverContent>
                </Popover>
                <Button type="submit" size="sm" variant="default" className="col-span-2">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </PopoverContent>
  );
}
