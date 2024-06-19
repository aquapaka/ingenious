import { Star } from 'lucide-react';
import { FAVORITE_COLOR } from '../../../../const/const';
import { Note } from '../../../../lib/types';
import { Button } from '../../../ui/button';
import { useUpdateNoteMutation } from '../../../../services/main-service';
import { toast } from 'sonner';

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
      <Star className={!minimal ? 'ml-2' : 'lucide-sm'} fill={note.isFavorite ? FAVORITE_COLOR : 'none'} />
    </Button>
  );
}
