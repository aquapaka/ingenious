import { useMediaQuery } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../ui/resizable';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import DirectoriesPanel from './components/directories-panel';
import { setDirectorySheetOpen } from '../../../app/slices/uiSlice';
import { Button } from '../../ui/button';
import { PanelLeftOpen } from 'lucide-react';

export default function MainPage() {
  const isDirectorySheetOpen = useSelector((state: RootState) => state.ui.isDirectorySheetOpen);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery('(min-width: 768px)');

  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      {isTablet ? (
        <>
          <ResizablePanel defaultSize={25} className="min-w-[280px]">
            <DirectoriesPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
        </>
      ) : (
        <Sheet open={isDirectorySheetOpen}>
          <SheetTrigger
            className={`fixed z-50 bottom-4 ${isDirectorySheetOpen ? '-right-10' : 'right-4'} duration-300`}
            onClick={() => dispatch(setDirectorySheetOpen(true))}
          >
            <Button size="icon" asChild className="z-50">
              <div className="">
                <PanelLeftOpen />
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-[280px]"
            onInteractOutside={() => dispatch(setDirectorySheetOpen(false))}
          >
            <DirectoriesPanel />
          </SheetContent>
        </Sheet>
      )}
      <ResizablePanel className="h-screen">
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
