import {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {getCookie} from 'utils/cookies';
import {ThemeProvider} from 'styled-components';
import {theme} from 'assets/styles/theme';
import {GlobalStyle} from 'assets/styles/GlobalStyle';
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
import UsersView from 'views/MainViews/UsersView';
import SettingsView from 'views/MainViews/SettingsView';
import ManageBorrowingsView from 'views/MainViews/ManageBorrowingsView/ManageBorrowingsView';
import BookDetailsView from 'views/MainViews/BookDetailsView/BookDetailsView';
import UserDetailsView from 'views/MainViews/UserDetailsView/UserDetailsView';
import {BookProvider} from 'providers/BookProvider';
import {UsersProvider} from 'providers/UsersProvider';
import {BorrowingsProvider} from 'providers/BorrowingsProvider';
import ForgotPasswordView from 'views/StartingViews/ForgotPasswordView';

const Root = () => {
  const {auth, refreshUserData, authChecked, setAuthChecked} = useContext(AuthContext);

  // Send request after page reload in order for user to stay logged in
  useEffect(() => {
    setAuthChecked(false);
    const user = getCookie('user');
    if (!user || user === 'LOGGED_OUT') {
      setAuthChecked(true);
      return;
    }
    refreshUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BookProvider>
          <UsersProvider>
            <BorrowingsProvider>
              {!authChecked ? (
                <Spinner />
              ) : (
                <Routes>
                  <Route path="/" element={<Navigate to={auth ? '/books' : '/login'} />}></Route>

                  {/*Publicly available routes*/}
                  <Route path="/reset-password/:token" element={<ResetPasswordView />}></Route>
                  <Route path="/forgot-password" element={<ForgotPasswordView />}></Route>
                  <Route path="/register" element={<RegisterView />}></Route>
                  <Route path="/login" element={<LoginView />}></Route>

                  {/*Routes for logged-in users*/}
                  <Route
                    element={<PrivateRoutes permittedRoles={['user', 'librarian', 'admin']} />}
                  >
                    <Route path="/book/:id" element={<BookDetailsView />}></Route>
                    <Route path="/books" element={<BooksView />}></Route>
                    <Route path="/settings" element={<SettingsView />}></Route>
                    <Route path="/history" element={<HistoryView />}></Route>
                  </Route>

                  {/*Routes available for librarians and admins only*/}
                  <Route element={<PrivateRoutes permittedRoles={['librarian', 'admin']} />}>
                    <Route path="/user/:id" element={<UserDetailsView />}></Route>
                    <Route path="/manage-borrowings" element={<ManageBorrowingsView />}></Route>
                    <Route path="/users" element={<UsersView />}></Route>
                    <Route path="/add-book" element={<AddBookView />}></Route>
                  </Route>
                </Routes>
              )}
            </BorrowingsProvider>
          </UsersProvider>
        </BookProvider>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
