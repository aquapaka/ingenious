import { Outlet } from 'react-router-dom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../ui/resizable';
import DirectoriesPanel from './components/directories-panel';

export default function MainPage() {
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={16} className="min-w-[200px]">
        <DirectoriesPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-screen">
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
