import { ModeToggle } from '@/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useGetNoteQuery } from '@/services/main-service';
import { NavLink, useParams } from 'react-router-dom';
import EditableNoteTitle from './editable-note-title';

export default function TopBar() {
  const { id } = useParams();
  const { data: note } = useGetNoteQuery(id);

  return (
    <div className="flex justify-between items-center p-2">
      <Breadcrumb className="pl-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to="/">Notes</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {note && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">
                  <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-2">
                    {note.icon}
                    <EditableNoteTitle note={note} />
                  </div>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <ModeToggle />
    </div>
  );
}
