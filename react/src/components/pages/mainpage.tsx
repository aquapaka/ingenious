import { Outlet } from 'react-router-dom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import CategoriesPanel from './components/directories-panel';

export default function MainPage() {
  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={12}>
          <CategoriesPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
