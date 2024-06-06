import { Button } from '@/components/ui/button';
import { Directory } from '@/lib/types';
import { useAddDirectoryMutation } from '@/services/main-service';
import { FolderPlus } from 'lucide-react';

export default function CreateNewDirectoryButton(props: { small?: boolean; parentDirectoryId?: string }) {
  const { small, parentDirectoryId } = props;
  const [addNewDorectory, { isLoading: isAddingDirectory }] = useAddDirectoryMutation();

  function handleCreateNewDirectory() {
    const directory: Omit<Directory, '_id' | 'directories' | 'notes'> & { parentDirectoryId?: string } = {
      icon: '',
      title: 'New directory',
      parentDirectoryId,
    };
    addNewDorectory(directory);
  }
  return (
    <Button
      variant="ghost"
      size={small ? 'sm-icon' : 'icon'}
      onClick={handleCreateNewDirectory}
      disabled={isAddingDirectory}
    >
      <FolderPlus size={small ? 14 : 16} strokeWidth={2} />
    </Button>
  );
}
