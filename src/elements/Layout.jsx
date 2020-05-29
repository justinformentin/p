import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import theme from '../../config/theme';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../store/sidebar';
import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { reset, prism } from 'styles';
import { SEO, Sidebar, ScrollTop } from 'elements';
import { Burger, Cross } from 'icons';
import { useCurrentWidth } from 'hooks/useCurrentWidth';
import 'typeface-aileron';
import 'typeface-open-sans';

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
  transition: width ease 0.3s;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background: #f0f0f0;
  width: ${props => (props.open ? '83%' : '98%')};
  @media (max-width: 850px) {
    width: ${props => (props.open ? '0%' : '98%')};
  }
`;

const BurgerContainer = styled.div`
  z-index: 1100;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  margin-right: ${props => (props.mobile && props.open ? '0' : '1rem')};
  ${props =>
    props.mobile
      ? `
        position: absolute;
        top: 1rem;
        right: 1rem;
      `
      : ` margin: 0.75rem 0 0 1rem;`};
`;

const BurgerWrap = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { open } = useSelector(state => state.sidebar);

  let width = useCurrentWidth();

  React.useEffect(() => {
    width < 850 && dispatch(toggleSidebar(false));
  }, []);

  const toggleAction = () => dispatch(toggleSidebar(open ? false : true));

  const SidebarButton = ({ mobile }) => (
    <BurgerContainer mobile={mobile} open={open} onClick={toggleAction}>
      <BurgerWrap>{open ? <Cross mobile={mobile} /> : <Burger />}</BurgerWrap>
    </BurgerContainer>
  );

  return (
    <ThemeProvider theme={theme}>
      <>
        <SEO />
        <BodyContainer>
          <Sidebar open={open} />
          {width < 850 && <SidebarButton mobile={true} />}
          <ChildrenContainer id="child-container" open={open}>
            {width > 850 && <SidebarButton mobile={false} />}
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
  children: PropTypes.any.isRequired,
};
