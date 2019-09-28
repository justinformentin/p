/* eslint no-unused-expressions: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import 'typeface-aileron';
import 'typeface-open-sans';
import { reset, headroom } from 'styles';
import { SEO } from 'elements';
import { Footer, Navigation } from 'components';
import theme from '../../config/theme';
import prism from '../styles/prism';
import ScrollTop from './ScrollTop';
// const prismstyles = require('../styles/prismstyles.js');

injectGlobal`
  ${reset}
  ${prism}
  li > p {
    font-size: 1rem !important;
    line-height: 1.2 !important;
  }
  li {
    font-size: 1rem !important;
    line-height: 1.2 !important;
  }
  .gatsby-resp-image-wrapper {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-radius: ${theme.borderRadius.default};
    .gatsby-resp-image-background-image, .gatsby-resp-image-image {
      border-radius: ${theme.borderRadius.default};
    }
  }
  .gatsby-resp-iframe-wrapper {
    margin-bottom: 2rem;
  }
  ${headroom}
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <SEO />
      <Navigation />
      {children}
      <Footer />
      <ScrollTop />
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};
