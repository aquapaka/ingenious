import { Outlet } from 'react-router-dom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import DirectoriesPanel from './components/directories-panel';
import TopBar from './components/top-bar';

export default function MainPage() {
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={18}>
        <DirectoriesPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <TopBar />
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
