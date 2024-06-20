import { Sparkle } from 'lucide-react';
import { toast } from 'sonner';
import { FAVORITE_COLOR } from '../../../../const/const';
import { Note } from '../../../../lib/types';
import { useUpdateNoteMutation } from '../../../../services/main-service';
import { Button } from '../../../ui/button';

export default function ToggleFavoriteButton(props: { note: Note; minimal?: boolean }) {
  const { note, minimal } = props;
  const [updateNote, { isLoading: isUpdatingNote }] = useUpdateNoteMutation();

  function handleOnFavorite() {
    if (!note || isUpdatingNote) return;
    const newIsFavorite = !note?.isFavorite;
    updateNote({ id: note?._id, note: { isFavorite: newIsFavorite } })
      .then(() => {
        toast.success(newIsFavorite ? 'This note is favorited' : 'This note is no longer favorite');
      })
      .catch((error) => {
        toast.error('Uh oh! Something when wrong', {
          description: error,
        });
      });
  }

  return (
    <Button
      variant="ghost"
      size={minimal ? 'sm-icon' : 'default'}
      className={!minimal ? 'ml-4' : ''}
      onClick={handleOnFavorite}
      disabled={isUpdatingNote}
    >
      {!minimal && 'Favorite'}
      <Sparkle
        className={`${!minimal ? 'ml-2' : 'lucide-sm'} ${note.isFavorite ? 'lucide-filled' : ''}`}
        fill={note.isFavorite ? FAVORITE_COLOR : 'none'}
      />
    </Button>
  );
}
