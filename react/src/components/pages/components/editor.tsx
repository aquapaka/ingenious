import { RootState } from '@/app/store';
import { updateContent } from '@/features/markdown-editor/markdownEditorSlice';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  MDXEditor,
  MDXEditorMethods,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Editor() {
  const content = useSelector((state: RootState) => state.markdownEditorReducer.content);
  const dispatch = useDispatch();
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    editorRef.current?.setMarkdown(content);
    console.log('editor content: ', content);
  }, [content]);

  return (
    <MDXEditor
      ref={editorRef}
      markdown={''}
      onChange={(value) => {
        dispatch(updateContent(value));
      }}
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        diffSourcePlugin({
          viewMode: 'source',
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <BlockTypeSelect />
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
    />
  );
}
