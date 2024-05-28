import { Frown, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Editor from './editor';
import { useGetNoteQuery } from '@/services/main-service';

export default function NotesPanel() {
  const { id } = useParams();
  const { data: note, error, isLoading } = useGetNoteQuery({ _id: id });

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
