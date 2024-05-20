import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import CategoriesPanel from './components/categories-panel';
import NotesPanel from './components/notes-panel';

export default function MainPage() {
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={12}>
          <CategoriesPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <NotesPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
