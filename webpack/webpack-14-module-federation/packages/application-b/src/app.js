import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
const appDom = document.getElementById('app');
const root = createRoot(appDom);
root.render(<App />);