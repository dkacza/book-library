import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from 'views/Root';
import { AuthProvider } from 'providers/AuthProvider';
import { BookProvider } from 'providers/BookProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <Root />
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>,
);
