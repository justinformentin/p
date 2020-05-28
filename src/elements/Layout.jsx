import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import theme from "../../config/theme";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../store/sidebar";
import { injectGlobal } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { reset, prism } from "styles";
import { SEO, Sidebar, ScrollTop } from "elements";
import { Burger, Cross } from "icons";
import "typeface-aileron";
import "typeface-open-sans";

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
  width: ${props => (props.open ? "83%" : "98%")};
  transition: width ease 0.3s;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: #f0f0f0;
`;

const BurgerContainer = styled.div`
  transition: all ease 0.3s;
  top: 0;
  left: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: table;
  z-index: 1100;
  -webkit-transition: opacity 0.2s, margin 0.4s;
  transition: opacity 0.2s, margin 0.4s;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const BurgerWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Layout = ({ edges, children }) => {
  const dispatch = useDispatch();
  const { open } = useSelector(state => state.sidebar);

  const toggleAction = () => {
    dispatch(toggleSidebar(open ? false : true));
  };

  const SidebarButton = () => (
    <BurgerContainer onClick={toggleAction} open={open}>
      <BurgerWrap>{open ? <Cross /> : <Burger />}</BurgerWrap>
    </BurgerContainer>
  );

  return (
    <ThemeProvider theme={theme}>
      <>
        <SEO />
        <BodyContainer>
          <Sidebar edges={edges} open={open} />
          <ChildrenContainer id="child-container" open={open}>
            <SidebarButton />
            {children}
            <ScrollTop />
          </ChildrenContainer>
        </BodyContainer>
      </>
    </ThemeProvider>
  );
};

export default Layout;

Layout.propTypes = {
  edges: PropTypes.array,
  children: PropTypes.any.isRequired
};

Layout.defaultProps = {
  edges: []
};
