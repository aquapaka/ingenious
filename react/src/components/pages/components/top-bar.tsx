import { ModeToggle } from '@/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useGetNoteQuery, useUpdateNoteMutation } from '@/services/main-service';
import { Loader2, Pencil } from 'lucide-react';
import { EditText, onSaveProps } from 'react-edit-text';
import { useParams } from 'react-router-dom';

export default function TopBar() {
  const { id } = useParams();
  const { data: note } = useGetNoteQuery(id);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  function handleTitleSave({ value }: onSaveProps) {
    updateNote({ ...note, title: value });
  }

  return (
    <div className="flex justify-between items-center p-2">
      <Breadcrumb className="pl-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Notes</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">
              {note && (
                <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-2">
                  {note.icon}
                  <EditText
                    className="inline-block"
                    inputClassName="focus:outline-0 focus:bg-secondary p-2 rounded-md"
                    defaultValue={note.title}
                    showEditButton
                    editButtonContent={<Pencil size={16} />}
                    editButtonProps={{
                      className: 'p-2 hover:bg-secondary rounded-sm',
                    }}
                    onSave={handleTitleSave}
                  />
                </div>
              )}
              {isUpdating && <Loader2 size={12} className="animate-spin" />}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ModeToggle />
    </div>
  );
}
