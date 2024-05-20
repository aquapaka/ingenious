import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import MainPage from './components/pages/mainpage';
import NotesPanel from './components/pages/components/notes-panel';
import { ThemeProvider } from './components/theme-provider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />}>
      <Route path="" element={<NotesPanel />} />
      <Route path="note/:id" element={<NotesPanel />} />
    </Route>,
  ),
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
