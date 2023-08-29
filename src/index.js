import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from 'views/Root';
import {AuthProvider} from 'providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // TODO - add strict mode
  <AuthProvider>
    <Root />
  </AuthProvider>,
);
