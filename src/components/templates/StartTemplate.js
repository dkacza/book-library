import React from 'react';
import { StyledViewWrapper } from 'components/templates/StartTemplate.styles';
import AsidePhoto from 'components/organisms/AsidePhoto';

const StartTemplate = () => {
  return (
    <StyledViewWrapper>
      <AsidePhoto></AsidePhoto>
      <main>
        <h1>Sign in</h1>
        <form>
          <input type="text" placeholder="email" />
          <input type="text" placeholder="hasło" />
          <a href="#">Forgot the password?</a>
          <button type="submit"></button>
        </form>
        <p>First time in our library?</p>
        <a href="#">Sign up</a>
      </main>
    </StyledViewWrapper>
  );
};
export default StartTemplate;
