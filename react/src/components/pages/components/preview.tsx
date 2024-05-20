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
import { useState } from 'react';

const markdownMock = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

export default function Preview() {
  const [value, setValue] = useState(markdownMock);

  return (
    <MDXEditor
      markdown={value}
      onChange={setValue}
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
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
    />
  );
}
