import { Note } from '@/lib/types';
import { useUpdateNoteMutation } from '@/services/main-service';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { CheckCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function Editor(props: { note: Note }) {
  const { note } = props;
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setContent(note.content);
  }, [note]);

  function handleOnChange(value: string) {
    setContent(value);
    updateNote({ ...note, content });
  }

  return (
    <>
      <MarkdownEditor
        className="h-[92%] rounded-none"
        visible
        value={content}
        onChange={handleOnChange}
        enableScroll
        autoFocus
        previewProps={{
          className: 'prose dark:prose-invert',
        }}
      />
      <p className="m-2 flex items-center text-xs">
        {isUpdating ? (
          <>
            <Loader2 className="mr-2" size={16} /> Saving...
          </>
        ) : (
          <>
            <CheckCheck className="mr-2" size={16} /> Saved
          </>
        )}
      </p>
    </>
  );
}

export default Editor;
