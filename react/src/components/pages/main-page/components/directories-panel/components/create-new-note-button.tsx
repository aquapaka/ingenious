import { Button } from '@/components/ui/button';
import { useAddNoteMutation } from '@/services/main-service';
import { FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CreateNoteData } from '../../../../../../services/api-types';

export default function CreateNewNoteButton(props: { small?: boolean; parentDirectoryId?: string }) {
  const { small, parentDirectoryId } = props;
  const [addNewNote, { isLoading: isAddingNote }] = useAddNoteMutation();
  const navigate = useNavigate();

  function handleCreateNewNote(event: React.MouseEvent) {
    event.stopPropagation();
    const note: CreateNoteData = {
      title: 'Untitled',
      content: '',
      directoryId: parentDirectoryId,
    };
    addNewNote(note).then(({ data }) => {
      if (data) navigate(`/notes/${data._id}`);
    });
  }
  return (
    <Button variant="ghost" size={small ? 'xs-icon' : 'icon'} onClick={handleCreateNewNote} disabled={isAddingNote}>
      <FilePlus className={small ? 'lucide-sm' : ''} />
    </Button>
  );
}
