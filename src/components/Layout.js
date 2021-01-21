import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
// import { Github, Linkedin, Twitter, Mail } from '../icons';
import 'typeface-work-sans';
import theme from '../../config/theme';
import reset from '../styles/reset';
// import prism from '../styles/prism'
// import {} from 'styled-components/cssprop';
// import photo from '../images/jf.jpg';
import { PageHeader } from './PageHeader';
import { SearchContainer } from './SearchContainer';
// import { Github } from '@styled-icons/feather/Github';
// import { Twitter } from '@styled-icons/feather/Twitter';
// import { Linkedin } from '@styled-icons/feather/Linkedin';
// import { Mail } from '@styled-icons/feather/Mail';
import { Sun } from '@styled-icons/feather/Sun';
import { Moon } from '@styled-icons/feather/Moon';
import { MaxWidth } from '../styles/shared';

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: #004988;
  }
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;
    height: calc(100vh - calc(100vh - 100%));
    min-height: -webkit-fill-available;
  }
  body {
    height: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: white;
    font-size: 18px;
  }
  a {
    transition: all 0.3s ease-in-out;
    color: black;
    text-decoration: underline;
    &:hover,

  }
  // #___gatsby {
  //   height: 100%;
  // }
  #gatsby-focus-wrapper{
    height: 100%;

  }
  ${reset}
`;

const Wrapper = styled.div`
  height: 100%;
`;

const Main = styled.main`
  position: relative;
  overflow: auto;
  background: var(--color-background);
  transition: background ease 0.3s;
  min-height: 908px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  svg {
    margin-left: 0.5rem;
    height: 24px;
    width: 24px;
    color: var(--color-text);
  }
`;

const IconItem = styled.div`
  font-color: ${(p) => console.log(p)}
  &:hover {
    cursor: pointer;
  }
`;

const ThemeVals = {
  dark: {
    PRIMARY: '#3da9fc',
    SECONDARY: '#90b4ce',
    TERTIARY: '#fbdd74',
    BACKGROUND: '#0e141b',
    TEXT: '#f9f9f9',
    GREY: '#a5a5a5',
    LINK: '#ffdead',
  },
  light: {
    PRIMARY: '#5aa7cd',
    SECONDARY: '#994ff3',
    TERTIARY: '#fbdd74',
    BACKGROUND: '#f9f9f9',
    TEXT: '#262626',
    GREY: '#696969',
    LINK: '#392500',
  },
};

const Layout = ({ children }) => {
  const initialTheme = localStorage.getItem('theme-switch');
  const [colorTheme, setColorTheme] = useState(initialTheme || 'light');

  const toggleTheme = () => {
    const c = colorTheme === 'light' ? 'dark' : 'light';
    setColorTheme(c);
  };
  useEffect(() => {
    const gs = document.body.querySelector('style[id=theme-switch]');
    gs && gs.remove();
    const ngs = document.createElement('style');
    ngs.setAttribute('id', 'theme-switch');
    const theme = ThemeVals[colorTheme];
    ngs.innerHTML = `body{
      --color-primary: ${theme.PRIMARY};
      --color-secondary: ${theme.SECONDARY};
      --color-tertiary: ${theme.TERTIARY};
      --color-background: ${theme.BACKGROUND};
      --color-text: ${theme.TEXT};
      --color-grey: ${theme.GREY};
      --color-link: ${theme.LINK};
    }`;
    document.body.insertAdjacentElement('afterbegin', ngs);
    localStorage.setItem('theme-switch', colorTheme);
  }, [colorTheme]);
  // useEffect(() => {
  //   const gt = localStorage.getItem('theme-switch');
  //   gt && setColorTheme(gt);
  // }, []);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Wrapper>
          <PageHeader />
          <Main>
            <IconContainer>
              {/* <IconWrap>
                <IconLink href="https://github.com/justinformentin">
                  <Github size="24" />
                </IconLink>
                <IconLink href="https://twitter.com/whatjustin" rel="me">
                  <Twitter size="24" />
                </IconLink>
                <IconLink href="https://linkedin.com/in/justinformentin">
                  <Linkedin size="24" />
                </IconLink>
                <IconLink href="mailto:talktojustintoday@gmail.com">
                  <Mail size="24" />
                </IconLink>
              </IconWrap> */}

              <IconWrap>
                <IconItem>
                  <SearchContainer />
                </IconItem>
                <IconItem onClick={toggleTheme}>
                  {colorTheme === 'light' ? <Moon /> : <Sun />}
                </IconItem>
              </IconWrap>
            </IconContainer>
            <MaxWidth>{children}</MaxWidth>
          </Main>
        </Wrapper>
      </>
    </ThemeProvider>
  );
};

export default Layout;
