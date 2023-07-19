import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import LoginView from 'views/LoginView';
import 'assets/styles/fonts.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ResetPasswordView from 'views/ResetPasswordView';
import RegisterView from 'views/RegisterView';

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Navigate to={"/login"}/>}></Route>
          <Route path="/reset-password" element={<ResetPasswordView />}></Route>
          <Route path="/register" element={<RegisterView />}></Route>
          <Route path="/login" element={<LoginView />}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
