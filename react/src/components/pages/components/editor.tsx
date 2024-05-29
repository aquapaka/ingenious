import { Note } from '@/lib/types';
import { useUpdateNoteMutation } from '@/services/main-service';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { CheckCheck, Loader2, TextCursorInput } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function Editor(props: { note: Note }) {
  const { note } = props;
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const debouncedUpdateNote = useDebouncedCallback((value) => {
    updateNote({ ...note, content: value });
    setIsTyping(false);
  }, 1000);
  const [isTyping, setIsTyping] = useState(false);

  function handleOnChange(value: string) {
    setIsTyping(true);
    debouncedUpdateNote(value);
  }

  return (
    <>
      <MarkdownEditor
        className="h-[92%] rounded-none"
        visible
        value={note.content}
        onChange={handleOnChange}
        enableScroll={false}
        autoFocus
        previewProps={{
          className: 'prose dark:prose-invert prose-sm lg:prose-base prose-ingenious',
        }}
      />
      <p className="m-2 flex items-center text-xs">
        {isTyping ? (
          <>
            <TextCursorInput className="mr-2 animate-pulse" size={16} /> Typing...
          </>
        ) : isUpdating ? (
          <>
            <Loader2 className="animate-spin mr-2" size={16} /> Saving...
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
