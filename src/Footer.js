import React from 'react';
import styled from 'styled-components';
import GitHubIcon from './GitHubIcon';

const StyledFooter = styled.div`
flex:none;
background-color: #E4DCCF;
color: rgb(0, 0, 0);
padding-top: 10px;
text-align: center;

& .footerheart {
  color: #D4726A;
}

& .footerlink {
  text-decoration: none;
  color: #226666;
}
`;

const Footer = () => (
  <StyledFooter>
    <a
      href="https://github.com/373AnamAlii"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon className="menuIcon" />
    </a>
    <p>
      Made by
      {/*span className="footerheart">♥</span */}

      <a
        className="footerlink"
        href="https://github.com/373AnamAlii"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' '}Anam Ali
      </a>
    </p>
  </StyledFooter>
);

export default Footer;
