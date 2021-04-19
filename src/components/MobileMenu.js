import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Burger, Cross } from '../icons';
import { Link } from 'gatsby';
import { Sun } from '@styled-icons/feather/Sun';
import { Moon } from '@styled-icons/feather/Moon';
import { SearchToggle } from './SearchToggle';
// import { useMounted } from '../hooks/useMounted';
import { Column, Row, MaxWidth, Spacer } from '../styles/shared';
import {
  LinkSections,
  NavItemWrap,
  NameContainer,
  H3,
  IconWrap,
  IconLink,
} from '../styles/header';

const MenuBody = styled.div`
  width: 100%;
  height: 100%;
  background: var(--color-background);
  position: absolute;
  top: 0;
  z-index: 1000;
  transition: opacity 0.3s ease;
`;

const MobileIconLink = styled(IconLink)`
  z-index: 1005;
  margin-right: 2rem;
  svg {
    stroke-width: 2px;
    height: 35px;
    width: 35px;
  }
`;

const LinkColumn = styled(Column)`
  font-size: 2rem;
  padding-top: 2rem;
  a {
    padding-bottom: 1rem;
  }
`;

const StyledLink = styled(Link)`
  width: fit-content;
`;

export const Menu = ({
  menuOpen,
  animate,
  toggleTheme,
  colorTheme,
  toggleMenu,
}) => {
  const MenuLink = ({ to, children }) => (
    <StyledLink to={to} onClick={toggleMenu}>
      {children}
    </StyledLink>
  );

  return (
    menuOpen &&
    createPortal(
      <MenuBody style={{ opacity: animate }}>
        <Spacer />
        <MaxWidth>
          <LinkSections>
            <NavItemWrap>
              <NameContainer>
                <H3>Justin</H3>
                <H3>Formentin</H3>
              </NameContainer>
            </NavItemWrap>
            <IconWrap>
              <MobileIconLink onClick={toggleMenu}>
                <Cross theme={colorTheme} />
              </MobileIconLink>
            </IconWrap>
          </LinkSections>
        </MaxWidth>
        <MaxWidth>
          <LinkColumn>
            <MenuLink to="/blog">Posts</MenuLink>
            <MenuLink to="/photos">Photos</MenuLink>
            <Row>
              <MobileIconLink>
                <SearchToggle toggleMenu={toggleMenu} />
              </MobileIconLink>
              <MobileIconLink onClick={toggleTheme}>
                {colorTheme === 'light' ? <Moon /> : <Sun />}
              </MobileIconLink>
            </Row>
          </LinkColumn>
        </MaxWidth>
      </MenuBody>,
      document.body
    )
  );
};

export const MobileMenu = ({ toggleTheme, colorTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(0);
  const gatsbyRoot = document.querySelector('#___gatsby');

  const mounted = React.useRef(false);
  React.useEffect(()=>{
    mounted.current = true;
    return () => (mounted.current = false)
  },[])

  const toggleMenu = () => {
    if (menuOpen) {
      document.body.style.overflow = 'unset';
      gatsbyRoot.style.filter = 'unset';
      mounted.current && setAnimate(0);
      setTimeout(() => mounted.current && setMenuOpen(false), 300);
    } else {
      document.body.style.overflow = 'hidden';
      gatsbyRoot.style.filter = 'blur(4px)';
      mounted.current && setMenuOpen(true);
      setTimeout(() => mounted.current && setAnimate(0.9), 10);
    }
  };

  return (
    <>
      {!menuOpen && (
        <IconLink onClick={toggleMenu}>
          <Burger theme={colorTheme} />
        </IconLink>
      )}
      {menuOpen && (
        <Menu
          menuOpen={menuOpen}
          animate={animate}
          colorTheme={colorTheme}
          toggleTheme={toggleTheme}
          toggleMenu={toggleMenu}
        />
      )}
    </>
  );
};
