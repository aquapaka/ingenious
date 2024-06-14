import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { store } from './app/store';
import LoginRegisterPage from './components/pages/login-register-page';
import MainPage from './components/pages/main-page';
import EditorPanel from './components/pages/main-page/components/editor-panel';
import { ThemeProvider } from './components/theme-provider';
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from './const/const';
import ProtectedRoute from './components/protected-route';
import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={LOGIN_PATHNAME} element={<LoginRegisterPage />} />
      <Route path={REGISTER_PATHNAME} element={<LoginRegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<EditorPanel />} />
          <Route path="notes/:id" element={<EditorPanel />} />
        </Route>
      </Route>
    </>,
  ),
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="h-screen">
          <RouterProvider router={router} />
        </div>
        <Toaster position="bottom-center" />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
