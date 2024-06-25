import { toast } from 'sonner';
import { Note, Tag } from '../../../../../../../../lib/types';
import {
  useDeleteTagMutation,
  useGetUserDataQuery,
  useUpdateNoteMutation,
} from '../../../../../../../../services/main-service';
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '../../../../../../../ui/context-menu';
import { Popover, PopoverTrigger } from '../../../../../../../ui/popover';
import { PencilLine, TagIcon, X, CirclePlus, Trash2 } from 'lucide-react';
import { TAG_BACKGROUND_OPACITY_HEX_CODE } from '../../../../../../../../const/const';
import { AlertDialogTrigger } from '../../../../../../../ui/alert-dialog';
import CreateTagPopoverContent from './create-tag-popover-content';
import { Button } from '../../../../../../../ui/button';
import { Badge } from '../../../../../../../ui/badge';
import { Dialogs, setDialog } from '../../../../../../../../app/slices/uiSlice';
import { useDispatch } from 'react-redux';

export default function NoteButtonContextMenuContent({ note }: { note: Note }) {
  const { data: user } = useGetUserDataQuery();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteTag, { isLoading: isDeletingTag }] = useDeleteTagMutation();
  const dispatch = useDispatch();

  function handleSelectTag(e: Event, selectedTag: Tag) {
    e.preventDefault();

    const tagIds = note._tags ? note._tags.map((tag) => tag._id) : [];
    const newTagIds = tagIds.includes(selectedTag._id)
      ? tagIds.filter((tagId) => tagId !== selectedTag._id)
      : [...tagIds, selectedTag._id];

    updateNote({
      id: note._id,
      note: {
        tagIds: newTagIds,
      },
    });
  }

  function handleDeleteTag(tagId: string) {
    if (isDeletingTag) return;
    deleteTag({ id: tagId })
      .then(() => {
        toast.success('Tag deleted');
      })
      .catch(() =>
        toast.error('Uh Oh! Something when wrong 😳', {
          description: 'Error while delete tag',
        }),
      );
  }

  return (
    <ContextMenuContent className="w-32">
      <ContextMenuSub>
        <PopoverTrigger asChild>
          <ContextMenuItem>
            <PencilLine className="mr-2" />
            Rename
          </ContextMenuItem>
        </PopoverTrigger>
        <ContextMenuSubTrigger>
          <TagIcon className="mr-2" />
          Tags
        </ContextMenuSubTrigger>
        <ContextMenuSubContent
          className="w-56"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onFocusOutside={(e) => e.preventDefault()}
        >
          {user?.allTags.map((tag) => (
            <div className="relative" key={tag._id}>
              <ContextMenuCheckboxItem
                checked={note._tags && note._tags.map((tag) => tag._id).includes(tag._id)}
                onSelect={(e) => handleSelectTag(e, tag)}
                className="peer duration-200"
              >
                <Badge variant="tag" style={{ backgroundColor: tag.color + TAG_BACKGROUND_OPACITY_HEX_CODE }}>
                  {tag.name}
                </Badge>
              </ContextMenuCheckboxItem>
              <div className="absolute right-1 top-[0.3rem] bg-background rounded-md opacity-0 hover:opacity-100 peer-hover:opacity-100 duration-300 h-[24px]">
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="xs-icon">
                      <PencilLine />
                    </Button>
                  </PopoverTrigger>
                  <CreateTagPopoverContent isUpdate tagToUpdate={tag} />
                </Popover>
                <Button
                  variant="ghost"
                  size="xs-icon"
                  onClick={() => handleDeleteTag(tag._id)}
                  disabled={isDeletingTag}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
          <ContextMenuSeparator />
          <Popover modal>
            <PopoverTrigger className="w-full">
              <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                <CirclePlus className="mr-2" />
                Create new tag
              </ContextMenuItem>
            </PopoverTrigger>
            <CreateTagPopoverContent />
          </Popover>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuItem asChild>
        <AlertDialogTrigger className="w-full" onClick={() => dispatch(setDialog(Dialogs.deleteNote))}>
          <Trash2 className="mr-2" />
          Delete
        </AlertDialogTrigger>
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
