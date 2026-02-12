import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.jsx';
import 'katex/dist/katex.min.css';
import './index.css';

import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            top: 20,
            zIndex: 99999,
          }}
        />
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
