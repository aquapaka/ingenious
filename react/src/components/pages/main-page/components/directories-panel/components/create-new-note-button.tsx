import { Button } from '@/components/ui/button';
import { Note } from '@/lib/types';
import { useAddNoteMutation } from '@/services/main-service';
import { FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateNewNoteButton(props: { small?: boolean; parentDirectoryId?: string }) {
  const { small, parentDirectoryId } = props;
  const [addNewNote, { isLoading: isAddingNote }] = useAddNoteMutation();
  const navigate = useNavigate();

  function handleCreateNewNote(event: React.MouseEvent) {
    event.stopPropagation();
    const note: Omit<Note, '_id'> & { parentDirectoryId?: string } = {
      icon: '',
      tags: [],
      title: 'New Note',
      content: '',
      parentDirectoryId,
    };
    addNewNote(note).then(({ data }) => {
      if (data) navigate(`/notes/${data._id}`);
    });
  }
  return (
    <Button variant="ghost" size={small ? 'sm-icon' : 'icon'} onClick={handleCreateNewNote} disabled={isAddingNote}>
      <FilePlus size={small ? 14 : 16} strokeWidth={2} />
    </Button>
  );
}
