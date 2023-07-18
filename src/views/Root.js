import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { GlobalStyle } from 'assets/styles/GlobalStyle';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>Hello world!</div>
    </ThemeProvider>
  );
};

export default Root;
