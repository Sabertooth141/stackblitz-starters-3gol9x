import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as React from 'react';

import { App } from './App';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <App name="CSDS221Pr2" />
  </StrictMode>
);
