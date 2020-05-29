import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
`;

const HeaderText = styled.div`
  color: #111;
  z-index: 10;
  text-align: center;
  & h2 {
    margin-bottom: 0;
  }
  @media (max-width: 850px) {
    margin-top: 1rem;
  }
`;

const HeaderSubtitle = styled.div`
  margin: 0;
`;

const Header = ({ children, title }) => (
  <HeaderWrapper>
    <HeaderText>
      {title && <h2>{title}</h2>}
      {children && <HeaderSubtitle>{children}</HeaderSubtitle>}
    </HeaderText>
  </HeaderWrapper>
);

export default Header;

Header.propTypes = {
  children: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  big: PropTypes.bool,
};

Header.defaultProps = {
  big: false,
  children: false,
  title: null,
};
