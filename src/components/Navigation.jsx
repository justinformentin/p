/* eslint no-unused-expressions: 0 */

import React from 'react';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import Headroom from 'react-headroom';
import { Logo } from 'icons';

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
  margin-left: 2.25rem;
  svg {
    height: 2.25rem;
    margin-bottom: 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 500;
  align-items: center;
  margin-right: 2.25rem;
  a {
    color: ${props => props.theme.colors.white.base};
    margin-left: 2rem;
    font-size: 1.1rem;
    display: inline-block;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #0087ca;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    &:hover::after {
      color: ${props => props.theme.colors.white.blue};
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;

const Navigation = () => (
  <Headroom calcHeightOnResize disableInlineStyles>
    <StyledLink to="/">
      <Logo />
    </StyledLink>
    <Nav>
      <Link to="/blog">Blog</Link>
      <Link to="/portfolio">Portfolio</Link>
    </Nav>
  </Headroom>
);

export default Navigation;
