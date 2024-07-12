import { Button } from '@/components/ui/button';
import { useAddDirectoryMutation } from '@/services/main-service';
import { FolderPlus } from 'lucide-react';
import { CreateDirectoryData } from '../../../../../../services/api-types';
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/app/slices/searchAndFilterSlice';

export default function CreateNewDirectoryButton(props: { small?: boolean; parentDirectoryId?: string }) {
  const { small } = props;
  const [addNewDorectory, { isLoading: isAddingDirectory }] = useAddDirectoryMutation();
  const dispatch = useDispatch();

  function handleCreateNewDirectory(event: React.MouseEvent) {
    event.stopPropagation();
    const directory: CreateDirectoryData = {
      title: 'Untitled',
      color: '#ffffff',
    };
    addNewDorectory(directory);
    dispatch(setSearchText(''));
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
