import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import polishFlagImg from 'assets/images/poland.png';
import ukFlagImg from 'assets/images/united-kingdom.png';

const StyledButton = styled.button`
  width: 64px;
  height: 42px;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  
  img {
    height: 100%;
    width: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`;

const LanguageButton = ({...props}) => {
  const [language, setLanguage] = useState('english');
  const [flag, setFlag] = useState(polishFlagImg);
  const handleLanguageChange = (e) => {
    e.preventDefault();
    const currentLang = language;
    if (currentLang === 'polish') {
      setLanguage('english');
      setFlag(polishFlagImg)
    }
    if (currentLang === 'english') {
      setLanguage('polish');
      setFlag(ukFlagImg);
    }
  }

  return (
    <StyledButton {...props} onClick={handleLanguageChange}>
      <img {...props} src={flag} alt={language} />
    </StyledButton>
    );
};
export default LanguageButton;