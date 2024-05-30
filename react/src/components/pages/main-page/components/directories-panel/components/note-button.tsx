import { Button } from '@/components/ui/button';
import { Note } from '@/lib/types';
import { StickyNote } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';

export default function NoteButton({ note }: { note: Note }) {
  const { id } = useParams();

  return (
    <Button asChild variant={id === note._id ? 'secondary' : 'ghost'} className="w-full justify-start">
      <NavLink to={`/notes/${note._id}`}>
        <span className="pl-4">{note.icon ? note.icon : <StickyNote size={16} />}</span>
        <span className="pl-2 overflow-hidden">{note.title}</span>
      </NavLink>
    </Button>
  );
}
