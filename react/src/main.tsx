import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';
import { toast } from 'sonner';

registerSW({
  immediate: true,
  onOfflineReady() {
    toast.info('Ready to work offline', {
      description: 'This app can work even you are not connected to internet. Yay!',
    });
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
