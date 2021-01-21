import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
// import { Github, Linkedin, Twitter, Mail } from '../icons';
import 'typeface-work-sans';
import theme from '../../config/theme';
import reset from '../styles/reset';
// import prism from '../styles/prism'
// import {} from 'styled-components/cssprop';
// import photo from '../images/jf.jpg';
import { Sidebar } from './Sidebar';
import { SearchContainer } from './SearchContainer';
// import { Github } from '@styled-icons/feather/Github';
// import { Twitter } from '@styled-icons/feather/Twitter';
// import { Linkedin } from '@styled-icons/feather/Linkedin';
// import { Mail } from '@styled-icons/feather/Mail';
import { Sun } from '@styled-icons/feather/Sun';
import { Moon } from '@styled-icons/feather/Moon';

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
  #___gatsby {
    height: 100%;
  }
  #gatsby-focus-wrapper{
    height: 100%;

  }
  ${reset}

`;

const Wrapper = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: 225px 1fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  position: relative;
  overflow: auto;
  background: var(--theme-background);
  transition: background ease 0.3s;
  min-height: 908px;
  @media (min-width: calc(900px + 1px)) {
    grid-column-start: 2;
  }
`;

// const PhotoContainer = styled(Link)``;

// const Photo = styled.img`
//   height: 100px;
//   opacity: 0.75;
//   margin-bottom: 1.5rem;
//   border-radius: 50%;
//   @media (max-width: 900px) {
//     height: 75px;
//     margin-bottom: 0;
//   }
// `;

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
    color: var(--theme-text);
  }
`;

const IconItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;


const defaultProps = {
  color: 'white',
};

const Layout = ({ children }) => {
  const initialTheme = localStorage.getItem('theme-switch');
  console.log('initialTheme', initialTheme)
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
    ngs.innerHTML = `body{
      --theme-background: ${colorTheme === 'dark' ? '#202530' : '#f9f9f9'};
      --theme-text:  ${colorTheme === 'dark' ? '#f9f9f9' : '#303030'};
      --theme-md-link: ${colorTheme === 'dark' ? '#ffdead' : '#392500'};
      --theme-grey: ${colorTheme === 'dark' ? '#a5a5a5' : '#696969'};
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
          <Sidebar />
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
            {children}
          </Main>
        </Wrapper>
      </>
    </ThemeProvider>
  );
};

export default Layout;

Layout.defaultProps = defaultProps;
