import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash2 } from 'lucide-react';
import NoteButton from './note-button/note-button';
import { Note } from '../../../../../../lib/types';

export default function TrashBin(props: { inTrashNodes: Note[] }) {
  const { inTrashNodes } = props;

  return (
    <AccordionItem value="trash" className="w-full overflow-scroll">
      <AccordionTrigger className="hover:bg-secondary rounded-md">
        <div className="flex items-center">
          <Trash2 size={16} />
          <span className="pl-2">Trash</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="">
          {inTrashNodes.map((note) => (
            <div key={note._id}>
              <NoteButton note={note} />
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
