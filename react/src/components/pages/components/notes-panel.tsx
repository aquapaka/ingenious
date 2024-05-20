import { useParams } from 'react-router-dom';
import NoteEdit from './note-edit';

export default function NotesPanel() {
  const { id } = useParams();

  return <div className="h-full">{id ? <NoteEdit /> : <p>Open a note to edit</p>}</div>;
}