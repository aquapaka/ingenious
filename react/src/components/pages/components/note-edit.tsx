import { RootState } from '@/app/store';
import { updateCurrentNoteContent } from '@/features/notes/notesSlice';
import { findNoteInDirectory } from '@/lib/utils';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function NoteEdit() {
  const { id } = useParams();
  const currentNote = useSelector((state: RootState) => {
    if (state.notesReducer.mainDirectory && id) return findNoteInDirectory(state.notesReducer.mainDirectory, id);
    return null;
  });
  const dispatch = useDispatch();

  return (
    <MarkdownEditor
      className="h-full rounded-none"
      visible
      value={currentNote?.content}
      onChange={(value) => {
        dispatch(updateCurrentNoteContent(value));
      }}
      enableScroll
      previewProps={{
        className: 'prose dark:prose-invert',
      }}
    />
  );
}

export default NoteEdit;
