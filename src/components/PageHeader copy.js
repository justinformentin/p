import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MaxWidth } from '../styles/shared';
import { Link } from 'gatsby';
import { MobileMenu } from './MobileMenu';
import { SearchToggle } from './SearchToggle';
import { Sun } from '@styled-icons/feather/Sun';
import { Moon } from '@styled-icons/feather/Moon';
import { Row } from '../styles/shared';
import { useMediaQuery } from '../hooks/useMediaQuery';

const PageHeaderContainer = styled.div`
  background: var(--color-background);
  transition: background 2s ease;
`;
const PageHeaderWrap = styled.div`
  position: relative;
  height: ${() => (window.location.pathname === '/' ? '11rem' : '7rem')};
  transition: opacity 2s ease, height 1s ease;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 0;
    background: linear-gradient(
      0deg,
      rgb(255 234 44 / 34%),
      rgb(255 60 0 / 40%),
      rgb(179 0 99 / 34%),
      rgba(0, 0, 0, 0.1)
    );
    transition: opacity 2s ease;
    opacity: var(--ho-dark);
  }
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 0;
    background: linear-gradient(
      0deg,
      rgb(179 234 255 / 100%),
      rgb(196 241 255 / 39%)
    );
    transition: opacity 2s ease;
    opacity: var(--ho-light);
  }
`;

const PageHeaderInner = styled(MaxWidth)`
  display: flex;
  position: ${() => (window.location.pathname === '/' ? 'sticky' : 'relative')};
  top: 0;
  z-index: 2;
`;

const NavItemWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  line-height: 1.2;
  font-family: ${(props) => props.theme.fontFamily.heading};
  a {
    text-decoration: none;
    &:hover,
    &:focus,
    &.navlink-active,
    &[aria-current='page'] {
      color: var(--color-link);
    }
  }
`;

const NameContainer = styled.div`
  text-align: center;
  text-decoration: none;
  margin: auto 0;
  line-height: 1.2;
`;

const H3 = styled.div`
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-text);
  transition: ${(props) => props.theme.trans.color};
  font-family: ${(props) => props.theme.fontFamily.heading};
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const IconWrap = styled.div`
  display: flex;
  margin-top: 0;
  margin-left: 0.75rem;
  justify-content: center;
  flex-direction: column;
`;

const IconLink = styled.a`
  text-align: center;
  margin-right: 1rem;
  color: var(--color-text);
  &:hover {
    color: var(--color-link);
    cursor: pointer;
  }
  svg {
    stroke-width: 2px;
    height: 22px;
    width: 22px;
  }
`;
const LinkSections = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const WaveContainer = styled.div`
  position: absolute;
  bottom: -31px;
  overflow: hidden;
  display: block;
  width: 100%;
  height: ${() => (window.location.pathname === '/' ? '148px' : '0')};
  transition: ${(props) => props.theme.trans.height};
  z-index: 3;
`;
const WaveSVG = styled.svg`
  position: relative;
  width: 100%;
  min-width: 500px;
  fill: var(--color-background);
  transition: ${(props) => props.theme.trans.fill};
`;

const Wave = () => (
  <WaveContainer>
    <WaveSVG
      preserveAspectRatio="none"
      width="1440"
      height="117"
      viewBox="0 0 1440 250"
      // transform="scale (-1, 1)"
      // transformOrigin="center"
    >
      <path d="M 0,400 C 0,400 0,200 0,200 C 85.11961722488039,176.04784688995215 170.23923444976077,152.0956937799043 271,145 C 371.7607655502392,137.9043062200957 488.1626794258374,147.66507177033492 592,165 C 695.8373205741626,182.33492822966508 787.1100478468899,207.244019138756 867,210 C 946.8899521531101,212.755980861244 1015.3971291866028,193.35885167464113 1109,188 C 1202.6028708133972,182.64114832535887 1321.3014354066986,191.32057416267943 1440,200 C 1440,200 1440,400 1440,400 Z"></path>
    </WaveSVG>
  </WaveContainer>
);

const Spacer = styled.div`
  width: 48px;
  height: 36px;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  padding-left: 1.5rem;
  @media (max-width: 500px) {
    font-size: 16px;
    padding-left: 0.75rem;
  }
`;

export function PageHeader({ toggleTheme, colorTheme }) {
  const mobile = useMediaQuery('750px');

  const HighlightLink = ({ to, label }) => {
    const activeIdx = window.location.pathname.indexOf(to);
    const activeClass = activeIdx !== -1 ? 'navlink-active' : '';
    return (
      <StyledLink className={activeClass} to={to}>
        {label}
      </StyledLink>
    );
  };
console.log('pageheader mobile', mobile)
  return (
    <PageHeaderContainer>
      <PageHeaderWrap>
        <Spacer />
        <PageHeaderInner>
          <LinkSections>
            <NavItemWrap>
              <Link to="/">
                <NameContainer>
                  <H3>Justin</H3>
                  <H3>Formentin</H3>
                </NameContainer>
              </Link>
              {!mobile ? (
                <>
                  <HighlightLink to="/blog" label="Posts" />
                  <HighlightLink to="/about" label="Snippets" />
                  <HighlightLink to="/photos" label="Photos" />
                </>
              ) : null}
            </NavItemWrap>
            <IconWrap>
              <Row>
                {mobile ? (
                  <MobileMenu toggleTheme={toggleTheme} colorTheme={colorTheme} />
                ) : (
                  <>
                    <IconLink>
                      <SearchToggle />
                    </IconLink>
                    <IconLink onClick={toggleTheme}>
                      {colorTheme === 'light' ? <Moon /> : <Sun />}
                    </IconLink>
                  </>
                )}
              </Row>
            </IconWrap>
          </LinkSections>
        </PageHeaderInner>
        <Wave />
      </PageHeaderWrap>
    </PageHeaderContainer>
  );
}
