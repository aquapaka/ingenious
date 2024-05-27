import { Outlet } from 'react-router-dom';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import CategoriesPanel from './components/directories-panel';
import TopBar from './components/top-bar';

export default function MainPage() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={18}>
        <CategoriesPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <TopBar />
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
