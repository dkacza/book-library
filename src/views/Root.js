import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import StartTemplate from 'components/templates/StartTemplate';
import "assets/styles/fonts.css";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <StartTemplate></StartTemplate>
    </ThemeProvider>
  );
};

export default Root;
