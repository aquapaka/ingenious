import { Outlet } from 'react-router-dom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import CategoriesPanel from './components/directories-panel';
import TopBar from './components/top-bar';

export default function MainPage() {
  return (
    <div className="flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={12}>
          <CategoriesPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <TopBar />
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
