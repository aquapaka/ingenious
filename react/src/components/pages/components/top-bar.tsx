import { ModeToggle } from '@/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { findNoteInDirectory } from '@/lib/utils';
import { useGetMainDirectoryQuery } from '@/services/main-service';
import { useParams } from 'react-router-dom';

export default function TopBar() {
  const { id } = useParams();
  const { data: mainDirectory, isLoading } = useGetMainDirectoryQuery(undefined);
  const note = findNoteInDirectory(id, mainDirectory);

  return (
    <div className="flex justify-between items-center p-2">
      <Breadcrumb className="pl-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Notes</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{note && `${note.icon} ${note.title}`}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ModeToggle />
    </div>
  );
}
