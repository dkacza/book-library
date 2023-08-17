import React from 'react';
import StyledLink from 'components/atoms/StyledLink';
import styled from 'styled-components';

const LinkWithDescription = ({ description, linkName, destination }) => {
  return (
    <div>
      <p>{description}</p>
      <StyledLink to={destination}>{linkName}</StyledLink>
    </div>
  );
};

export default styled(LinkWithDescription)``;
