import React from 'react';
import styled from 'styled-components';
import { MaxWidth } from '../styles/shared';
import { Link } from 'gatsby';
import { MobileMenu } from './MobileMenu';
import { SearchToggle } from './SearchToggle';
import { Sun } from '@styled-icons/feather/Sun';
import { Moon } from '@styled-icons/feather/Moon';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Row, Spacer } from '../styles/shared';
import {
  LinkSections,
  NavItemWrap,
  NameContainer,
  H3,
  IconWrap,
  IconLink,
} from '../styles/header';

const PageHeaderContainer = styled.div`
  background: var(--color-background);
  transition: background 0.3s ease;
`;

const PageHeaderInner = styled(MaxWidth)`
  display: flex;
  position: relative;
  z-index: 10;
`;

const WaveSVG = styled.svg`
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 500px;
  height: 160px;
  z-index: 2;
  transition: opacity 3s ease;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  padding-left: 1.5rem;
  @media (max-width: 500px) {
    font-size: 16px;
    padding-left: 0.75rem;
  }
`;

const Wave = ({ colorTheme }) => (
  <>
    <WaveSVG
      preserveAspectRatio="none"
      width="1440"
      viewBox="0 0 1440 320"
      style={{ opacity: colorTheme === 'light' ? 1 : 0 }}
    >
      <defs>
        <linearGradient id="dayGrad" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor="rgb(179 234 255 / 100%)" />
          <stop offset="95%" stopColor="rgb(196 241 255 / 39%)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#dayGrad)"
        // d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,144C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,234.7C840,245,960,203,1080,192C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,32L60,53.3C120,75,240,117,360,133.3C480,149,600,139,720,138.7C840,139,960,149,1080,181.3C1200,213,1320,267,1380,293.3L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,128L60,122.7C120,117,240,107,360,117.3C480,128,600,160,720,170.7C840,181,960,171,1080,176C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,128L60,138.7C120,149,240,171,360,197.3C480,224,600,256,720,272C840,288,960,288,1080,288C1200,288,1320,288,1380,288L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,224L60,224C120,224,240,224,360,208C480,192,600,160,720,154.7C840,149,960,171,1080,170.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,128L60,122.7C120,117,240,107,360,138.7C480,171,600,245,720,245.3C840,245,960,171,1080,154.7C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        d="M0,224L60,218.7C120,213,240,203,360,213.3C480,224,600,256,720,250.7C840,245,960,203,1080,202.7C1200,203,1320,245,1380,266.7L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      ></path>
    </WaveSVG>
    <WaveSVG
      preserveAspectRatio="none"
      width="1440"
      viewBox="0 0 1440 320"
      style={{ opacity: colorTheme === 'dark' ? 1 : 0 }}
    >
      <defs>
        <linearGradient id="nightGrad" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="rgba(60 170 255 / 30%)" />
          <stop offset="70%" stopColor="rgb(255 60 0 / 25%)" />
          <stop offset="100%" stopColor="rgb(255 234 44 / 34%)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#nightGrad)"
        // d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,144C840,149,960,203,1080,213.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,234.7C840,245,960,203,1080,192C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,32L60,53.3C120,75,240,117,360,133.3C480,149,600,139,720,138.7C840,139,960,149,1080,181.3C1200,213,1320,267,1380,293.3L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,128L60,122.7C120,117,240,107,360,117.3C480,128,600,160,720,170.7C840,181,960,171,1080,176C1200,181,1320,203,1380,213.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,128L60,138.7C120,149,240,171,360,197.3C480,224,600,256,720,272C840,288,960,288,1080,288C1200,288,1320,288,1380,288L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,224L60,224C120,224,240,224,360,208C480,192,600,160,720,154.7C840,149,960,171,1080,170.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        // d="M0,128L60,122.7C120,117,240,107,360,138.7C480,171,600,245,720,245.3C840,245,960,171,1080,154.7C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        d="M0,224L60,218.7C120,213,240,203,360,213.3C480,224,600,256,720,250.7C840,245,960,203,1080,202.7C1200,203,1320,245,1380,266.7L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      ></path>
    </WaveSVG>
  </>
);

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

  console.log('page header mobile', mobile);
  return (
    <PageHeaderContainer>
      <Wave colorTheme={colorTheme} />
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
                {/* <HighlightLink to="/snippets" label="Snippets" /> */}
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
    </PageHeaderContainer>
  );
}
