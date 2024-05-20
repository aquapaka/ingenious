import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Editor from './editor';
import Preview from './preview';

function NoteEdit() {
  return (
    <ResizablePanelGroup direction="horizontal" className="bg-green-100">
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
