import { Note } from '@/lib/types';
import { useUpdateNoteMutation } from '@/services/main-service';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  Separator,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { CheckCheck, Loader2, TextCursorInput } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function Editor(props: { note: Note }) {
  const { note } = props;
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
  const debouncedUpdateNote = useDebouncedCallback((value) => {
    setIsTyping(false);
    updateNote({ id: note._id, note: { content: value } });
  }, 1000);
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<MDXEditorMethods>(null);

  function handleOnChange(value: string) {
    setIsTyping(true);
    debouncedUpdateNote(value);
  }

  async function imageUploadHandler(image: File) {
    console.log('Uploaded image', image);
    return 'Uploaded image url';
  }

  // Re-focus editor when note id change
  useEffect(() => {
    ref.current?.focus();
  }, [note._id]);

  return (
    <>
      <MDXEditor
        // Important: this key is needed for react to create new editor instance for each difference note
        key={note._id}
        ref={ref}
        className="grow flex flex-col overflow-auto dark-theme"
        contentEditableClassName="prose dark:prose-invert prose-sm lg:prose-base prose-ingenious max-w-none mx-auto"
        onChange={handleOnChange}
        markdown={note.content}
        plugins={[
          // Basic
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          imagePlugin({ imageUploadHandler }),
          diffSourcePlugin(),
          imagePlugin(),
          tablePlugin(),
          markdownShortcutPlugin(),
          // Additional
          // frontmatterPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper options={['rich-text', 'source']}>
                  <UndoRedo />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <InsertTable />
                  <ListsToggle />
                  <Separator />
                  <CreateLink />
                  <InsertImage />
                  <Separator />
                  <CodeToggle />
                  <InsertThematicBreak />
                  {/* <InsertFrontmatter /> */}
                  {/* </DiffSourceToggleWrapper> */}
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
      <div className="border-t">
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
      </div>
    </>
  );
}

export default Editor;
