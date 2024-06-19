import { ModeToggle } from '@/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useGetNoteQuery, useGetUserDataQuery } from '@/services/main-service';
import { Folder, StickyNote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Directory } from '../../../../../../lib/types';
import ToggleFavoriteButton from '../../toggle-favorite-button';
import EditableNoteTitle from './editable-note-title';

export default function TopBar() {
  const { id } = useParams();
  const { data: userData } = useGetUserDataQuery();
  const { data: note } = useGetNoteQuery(id!, { skip: !id });
  const [currentDirectory, setCurrentDirectory] = useState<Directory | undefined>(undefined);

  useEffect(() => {
    if (userData && note)
      setCurrentDirectory(userData.allDirectories.find((directory) => directory._id === note._directory));
  }, [note, userData]);

  if (!note) return;

  return (
    <div className="flex justify-between items-center p-2">
      <Breadcrumb className="pl-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to="/">Notes</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {currentDirectory && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center">
                  <Folder fill={currentDirectory.color} className="inline-block mr-2" />
                  <span>{currentDirectory.title}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">
              <StickyNote className="inline-block mr-2" />
              <div className="[&>div]:flex [&>div]:items-center [&>div]:gap-0">
                <EditableNoteTitle note={note} />
              </div>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ToggleFavoriteButton note={note} />
      <ModeToggle />
    </div>
  );
}
