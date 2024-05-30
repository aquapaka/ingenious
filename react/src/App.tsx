import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import MainPage from './components/pages/main-page/mainpage';
import NotesPanel from './components/pages/main-page/components/notes-panel';
import { ThemeProvider } from './components/theme-provider';
import { Provider } from 'react-redux';
import { store } from './app/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />}>
      <Route path="" element={<NotesPanel />} />
      <Route path="notes/:id" element={<NotesPanel />} />
    </Route>,
  ),
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-screen">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
