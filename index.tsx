import React from 'react';
import { createRoot } from 'react-dom/client';
import AudiometricReport from './src/App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AudiometricReport />
    </React.StrictMode>
  );
}
