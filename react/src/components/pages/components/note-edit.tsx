import { findNoteInDirectory } from '@/lib/utils';
import { useGetMainDirectoryQuery, useUpdateNoteMutation } from '@/services/main-service';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Frown, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NoteEdit() {
  const { id } = useParams();
  const { data: mainDirectory, error, isLoading } = useGetMainDirectoryQuery(undefined);
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (id && mainDirectory) {
      const note = findNoteInDirectory(mainDirectory, id);
      if (note) setContent(note.content);
    }
  }, [id, mainDirectory]);

  function handleOnChange(value: string) {
    if (id) updateNote({ note: { content: value }, id });
  }

  return (
    <div className="h-[94%] flex justify-center items-center">
      {isLoading ? (
        <p className="flex items-center">
          <Loader2 className="animate-spin mr-2" /> Loading note...
        </p>
      ) : error ? (
        <p className="flex items-center">
          <Frown className="mr-2" /> Error while loading note
        </p>
      ) : (
        <>
          <MarkdownEditor
            className="rounded-none"
            visible
            value={content}
            onChange={handleOnChange}
            enableScroll
            previewProps={{
              className: 'prose dark:prose-invert',
            }}
          />
          Status: {isUpdating ? 'Updating' : 'Done'}
        </>
      )}
    </div>
  );
}

export default NoteEdit;
