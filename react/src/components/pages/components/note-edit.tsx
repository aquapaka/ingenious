import MarkdownEditor from '@uiw/react-markdown-editor';
import { useParams } from 'react-router-dom';

function NoteEdit() {
  const { id } = useParams();

  return (
    <MarkdownEditor
      className="h-[94%] rounded-none"
      visible
      value={''}
      onChange={(value) => {
        console.log(value);
      }}
      enableScroll
      previewProps={{
        className: 'prose dark:prose-invert',
      }}
    />
  );
}

export default NoteEdit;
