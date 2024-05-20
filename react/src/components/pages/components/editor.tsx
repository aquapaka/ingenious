import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState } from 'react';

const markdownMock = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

export default function Editor() {
  const [value, setValue] = useState(markdownMock);

  return (
    <MarkdownEditor
      className="h-full rounded-none"
      value={value}
      onChange={(value, viewUpdate) => {
        setValue(value);
      }}
    />
  );
}
