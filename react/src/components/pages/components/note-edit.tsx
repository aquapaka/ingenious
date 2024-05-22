import { RootState } from '@/app/store';
import { updateContent } from '@/features/markdown-editor/markdownEditorSlice';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useDispatch, useSelector } from 'react-redux';

function NoteEdit() {
  const content = useSelector((state: RootState) => state.markdownEditorReducer.content);
  const dispatch = useDispatch();

  return (
    <MarkdownEditor
      className="h-full rounded-none"
      visible
      value={content}
      onChange={(value) => {
        dispatch(updateContent(value));
      }}
      enableScroll
      previewProps={{
        className: 'prose dark:prose-invert',
      }}
    />
  );
}

export default NoteEdit;
