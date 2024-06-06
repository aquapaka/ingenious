import { Directory } from '@/lib/types';
import { useUpdateDirectoryMutation } from '@/services/main-service';
import { Loader2, PencilLine } from 'lucide-react';
import { useRef } from 'react';
import { EditText, onSaveProps } from 'react-edit-text';

export default function EditableDirectoryTitle(props: {
  directory: Directory;
  isShowOnHover?: boolean;
  isIconSmall?: boolean;
}) {
  const { directory, isShowOnHover, isIconSmall } = props;
  const [updateDirectory, { isLoading: isUpdating }] = useUpdateDirectoryMutation();
  const editTextRef = useRef(null);

  function handleTitleSave({ value }: onSaveProps) {
    updateDirectory({ ...directory, title: value });
  }

  return (
    <>
      <EditText
        inputClassName="focus:outline-0 focus:bg-secondary p-2 rounded-md"
        defaultValue={directory.title}
        showEditButton
        editButtonContent={<PencilLine size={isIconSmall ? 14 : 16} />}
        editButtonProps={{
          className: `ml-2 p-1 rounded-md ${isShowOnHover && 'opacity-0 group-hover:opacity-100 duration-300'}  `,
        }}
        onSave={handleTitleSave}
        ref={editTextRef}
      />
      {isUpdating && <Loader2 size={12} className="animate-spin" />}
    </>
  );
}
