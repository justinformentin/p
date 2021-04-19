import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { PageHeader } from './PageHeader';
import theme from '../../config/theme';
import reset from '../styles/reset';
import 'typeface-work-sans';
// import '@fontsource/work-sans';
// import 'typeface-aileron';
// import 'typeface-ubuntu';
import 'typeface-source-sans-pro';
// import '@fontsource/source-sans-pro';
// import 'typeface-oxygen';
// import 'typeface-nunito';
// import 'typeface-montserrat';

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: #004988;
  }
  // @font-face{
  //   font-family:Source Sans Pro;
  //   font-style:normal;
  //   font-display:swap;
  //   font-weight:400;
  //   src:local("Source Sans Pro Regular normal"),
  //   local("Source Sans Pro-Regularnormal"),
  //   url(/static/fonts/source-sans-pro-400.woff2) format("woff2"),
  //   url(/static/fonts/source-sans-pro-400.woff) format("woff")
  // }
  // @font-face{
  //   font-family:Source Sans Pro;
  //   font-style:normal;
  //   font-display:swap;
  //   font-weight:700;
  //   src:local("Source Sans Pro Bold normal"),
  //   local("Source Sans Pro-Boldnormal"),
  //   url(/static/fonts/source-sans-pro-700.woff2) format("woff2"),
  //   url(/static/fonts/source-sans-pro-700.woff) format("woff")
  // }

  // @font-face{
  //   font-family:Work Sans;
  //   font-style:normal;
  //   font-display:swap;
  //   font-weight:400;
  //   src:local("Work Sans Regular"),
  //   local("Work Sans-Regular"),
  //   url(/static/fonts/work-sans-latin-400.woff2) format("woff2"),
  //   url(/static/fonts/work-sans-latin-400.woff) format("woff")
  // }
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
    font-size: 18px;
    font-family: Work Sans;
  }
  h1, h2, h3, h4, h5, h6 {
    // font-family: Source Sans Pro;
    font-family: Work Sans;
  }
  h3 {
    font-size: 1.5rem;
  }
  a {
    transition: all 0.3s ease;
    text-decoration: none;
    color: var(--color-text);
  }
  #___gatsby {
    height: 100%;
    transition: filter 0.3s ease;
  }
  #gatsby-focus-wrapper{
    height: 100%;
  }

  ${reset}
`;

const Main = styled.main`
  background: var(--color-background);
  transition: ${(props) => props.theme.trans.bg};
  min-height: 908px;
  padding-top: 5rem;
`;

const ThemeVals = {
  dark: {
    PRIMARY: '#3da9fc',
    SECONDARY: '#90b4ce',
    TERTIARY: '#fbdd74',
    BACKGROUND: '#1c232b',
    TEXT: '#f9f9f9',
    GREY: '#a5a5a5',
    LINK: '#ffdead',
    POSTHEADER: '#1c232b',
    BLUE: '#4fa2ea',
    BLUEHEAD: '#4fa2ea',
    BQ_BG: '#2f3a48',
    MD_LINK: '#95c4ea',
    MD_UND: '#a9aff6',
    INLINECODE: '#b1a3ff',
  },
  light: {
    PRIMARY: '#5aa7cd',
    SECONDARY: '#5d1bdc',
    TERTIARY: '#fbdd74',
    BACKGROUND: '#f9f9f9',
    TEXT: '#262626',
    GREY: '#696969',
    LINK: '#b54f07',
    POSTHEADER: '#b3eaff',
    BLUE: '#4fa2ea',
    BLUEHEAD: '#0041b7',
    BQ_BG: '#e6e6e6',
    MD_LINK: '#115ac7',
    MD_UND: '#a9aff6',
    INLINECODE: '#4b28db',
  },
};

const Layout = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(null);

  const toggleTheme = () => {
    const c = colorTheme === 'light' ? 'dark' : 'light';
    setColorTheme(c);
  };
  useEffect(() => {
    const initialTheme = localStorage.getItem('theme-switch');
    setColorTheme(initialTheme || 'light');
  }, []);
  useEffect(() => {
    if (colorTheme) {
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
      --color-postheader: ${theme.POSTHEADER};
      --color-blue: ${theme.BLUE};
      --color-bluehead: ${theme.BLUEHEAD};
      --color-bqbg: ${theme.BQ_BG};
      --color-md-link: ${theme.MD_LINK};
      --color-md-und: ${theme.MD_UND};
      --color-inlinecode: ${theme.INLINECODE}
    }`;
      document.body.insertAdjacentElement('afterbegin', ngs);
      localStorage.setItem('theme-switch', colorTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorTheme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {colorTheme ? (
        <>
          <PageHeader toggleTheme={toggleTheme} colorTheme={colorTheme} />
          <Main>{children}</Main>
        </>
      ) : null}
    </ThemeProvider>
  );
};

export default Layout;
