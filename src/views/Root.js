import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import StartView from 'views/StartView/StartView';
import 'assets/styles/fonts.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Root = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<StartView />}></Route>
          <Route path="/reset-password" element={<p>RESET PASSWORD</p>}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
