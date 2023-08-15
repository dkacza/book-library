import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from 'views/Root';
import { AuthProvider } from 'providers/AuthProvider';
import { BookProvider } from 'providers/BookProvider';
import { BorrowingsProvider } from 'providers/BorrowingsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <BorrowingsProvider>
          <Root />
        </BorrowingsProvider>
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>,
);
