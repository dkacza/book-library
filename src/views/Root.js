import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import StartView from 'views/StartView/StartView';
import "assets/styles/fonts.css";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <StartView></StartView>
    </ThemeProvider>
  );
};

export default Root;
