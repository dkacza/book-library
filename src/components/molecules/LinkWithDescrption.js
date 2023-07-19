import React from 'react';
import { StyledLink } from 'components/atoms/StyledLink';

const LinkWithDescription = ({ description, linkName, destination }) => {
  return (
    <div>
      <p>{description}</p>
      <StyledLink to={destination}>{linkName}</StyledLink>
    </div>
  );
};

export default LinkWithDescription;
