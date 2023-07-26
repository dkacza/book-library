import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'api/axios';
import { getCookie } from 'utils/cookies';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import 'assets/styles/fonts.css';
import ResetPasswordView from 'views/StartingViews/ResetPasswordView';
import RegisterView from 'views/StartingViews/RegisterView';
import LoginView from 'views/StartingViews/LoginView';
import AuthContext from 'providers/AuthProvider';
import PrivateRoutes from 'utils/PrivateRoutes';
import Spinner from 'components/atoms/Spinner';
import BooksView from 'views/MainViews/BooksView';
import AddBookView from 'views/MainViews/AddBookView';
import HistoryView from 'views/MainViews/HistoryView';
import ManageBorrowings from 'views/MainViews/ManageBorrowingsView';
import UsersView from 'views/MainViews/UsersView';
import ManageBorrowingsView from 'views/MainViews/ManageBorrowingsView';
import SettingsView from 'views/MainViews/SettingsView';

const Root = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthChecked(false);
    const userId = getCookie('user');
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        const { user } = res.data.data;
        setAuth(user);
        setAuthChecked(true);
      })
      .catch((err) => {
        console.log('Cannot retrieve authorization data');
      })
      .finally(() => {
        setAuthChecked(true);
      });
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {!authChecked ? (
          <Spinner></Spinner>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to={auth ? '/books' : '/login'} />}></Route>

            {/*Publicly available routes*/}
            <Route path="/reset-password" element={<ResetPasswordView />}></Route>
            <Route path="/register" element={<RegisterView />}></Route>
            <Route path="/login" element={<LoginView />}></Route>

            {/*Routes for logged-in users*/}
            <Route element={<PrivateRoutes permittedRoles={['user', 'librarian', 'admin']} />}>
              <Route path="/books" element={<BooksView />}></Route>
              <Route path="/add-book" element={<AddBookView />}></Route>
              <Route path="/history" element={<HistoryView />}></Route>
              <Route path="/manage-borrowings" element={<ManageBorrowingsView />}></Route>
              <Route path="/users" element={<UsersView />}></Route>
              <Route path="/settings" element={<SettingsView />}></Route>
            </Route>
          </Routes>
        )}
      </ThemeProvider>
    </Router>
  );
};

export default Root;
