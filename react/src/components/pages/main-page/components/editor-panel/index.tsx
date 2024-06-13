import { Frown, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from './editor';
import { useGetNoteQuery } from '@/services/main-service';
import { useEffect } from 'react';

export default function EditorPanel() {
  const { id } = useParams();
  const { data: note, error, isLoading } = useGetNoteQuery(id || '', { skip: id === undefined });
  const navigate = useNavigate();

  useEffect(() => {
    if (error) navigate('/');
  }, [navigate, error]);

  return (
    <div className="h-full flex justify-center items-center">
      {!id ? (
        <p>Open a note to edit</p>
      ) : isLoading ? (
        <p className="flex items-center">
          <Loader2 className="animate-spin mr-2" /> Loading note...
        </p>
      ) : error || !note ? (
        <p className="flex items-center">
          <Frown className="mr-2" /> Error while loading note
        </p>
      ) : (
        <div className="h-full w-full">
          <Editor note={note} />
        </div>
      )}
    </div>
  );
}
