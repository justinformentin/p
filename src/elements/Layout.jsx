import React from "react";
import PropTypes from "prop-types";
import { injectGlobal } from "emotion";
import { ThemeProvider } from "emotion-theming";
import styled from "react-emotion";
import "typeface-aileron";
import "typeface-open-sans";
import { reset } from "styles";
import { SEO } from "elements";
import theme from "../../config/theme";
import prism from "../styles/prism";
import ScrollTop from "./ScrollTop";
import { Sidebar } from "elements";
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
`;

const BodyContainer = styled.div`
  height: 100%;
  display: flex;
`;

const ChildrenContainer = styled.div`
  height: 100%;
  width: 83%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: #f0f0f0;
`;

const Layout = ({ edges, children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <SEO />
      <BodyContainer>
        <Sidebar edges={edges} />
          <ChildrenContainer id="child-container">
            {children}
            <ScrollTop />
          </ChildrenContainer>
      </BodyContainer>
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;

Layout.propTypes = {
  edges: PropTypes.array,
  children: PropTypes.any.isRequired
};

Layout.defaultProps = {
  edges: []
};
