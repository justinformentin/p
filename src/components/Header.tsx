import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
    margin-top: 2rem;
    @media (max-width: 900px) {
    margin-top: 0.5rem;
  }
`;

const HeaderText = styled.div`
  color: var(--theme-text);
  z-index: 10;
  text-align: center;
  transition: color ease 0.3s;

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
