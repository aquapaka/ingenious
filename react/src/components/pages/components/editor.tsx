import {
  BoldItalicUnderlineToggles,
  MDXEditor,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useState } from 'react';

const markdownMock = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

export default function Editor() {
  const [value, setValue] = useState(markdownMock);

  return (
    <MDXEditor
      className="rounded-none"
      markdown={value}
      onChange={setValue}
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
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
    />
  );
}
