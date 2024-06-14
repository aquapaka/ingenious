import { Note } from '../../../../../../lib/types';
import { useUpdateNoteMutation } from '../../../../../../services/main-service';
import { Loader2, PencilLine } from 'lucide-react';
import { EditText, onSaveProps } from 'react-edit-text';

export default function EditableNoteTitle(props: { note: Note; isShowOnHover?: boolean; isIconSmall?: boolean }) {
  const { note, isShowOnHover, isIconSmall } = props;
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  function handleTitleSave({ value }: onSaveProps) {
    updateNote({ id: note._id, note: { title: value } });
  }

  return (
    <>
      <EditText
        className=""
        inputClassName="focus:outline-0 focus:bg-secondary p-2 rounded-md"
        defaultValue={note.title}
        showEditButton
        editButtonContent={<PencilLine size={isIconSmall ? 14 : 16} />}
        editButtonProps={{
          className: `ml-2 p-1 rounded-md ${isShowOnHover && 'opacity-0 group-hover:opacity-100 duration-300'}  `,
        }}
        onSave={handleTitleSave}
      />
      {isUpdating && <Loader2 size={12} className="animate-spin" />}
    </>
  );
}
