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
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Preview() {
  const content = useSelector((state: RootState) => state.markdownEditorReducer.content);
  const dispatch = useDispatch();
  const previewRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    previewRef.current?.setMarkdown(content);
    console.log('preview content: ', content);
  }, [content]);

  return (
    <MDXEditor
      ref={previewRef}
      markdown={''}
      onChange={(value) => {
        dispatch(updateContent(value));
      }}
      contentEditableClassName="prose"
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        diffSourcePlugin({
          viewMode: 'rich-text',
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
