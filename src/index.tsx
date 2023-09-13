import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { API_KEY } from './api';

const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
  <StrictMode>
    <div>Hello, my api key is {`${API_KEY}`}</div>
  </StrictMode>
);
