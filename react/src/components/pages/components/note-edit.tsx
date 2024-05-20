import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Editor from './editor';
import Preview from './preview';

function NoteEdit() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <Editor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default NoteEdit;
