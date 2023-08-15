import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from 'views/Root';
import { AuthProvider } from 'providers/AuthProvider';
import { BookProvider } from 'providers/BookProvider';
import { BorrowingsProvider } from 'providers/BorrowingsProvider';
import { UsersProvider } from 'providers/UsersProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BookProvider>
        <UsersProvider>
          <BorrowingsProvider>
            <Root />
          </BorrowingsProvider>
        </UsersProvider>
      </BookProvider>
    </AuthProvider>
  </React.StrictMode>,
);
