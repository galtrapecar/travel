import React from 'react';
import ReactDOM from 'react-dom/client';
import './root.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <Router>
          <App />
        </Router>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

reportWebVitals();
