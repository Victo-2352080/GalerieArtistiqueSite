import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import FavorisProvider from './Contexts/favoris.context';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavorisProvider>
      <App />
    </FavorisProvider>
  </StrictMode>,
);
