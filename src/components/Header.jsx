import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

const Wrapper = styled.header`
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
`;

const Text = styled.div`
  color: #111;
  z-index: 10;
  text-align: center;
  & h2 {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.div`
  margin: 0;
  color: ${props => props.theme.colors.white.blue};
`;

const Header = ({ children, title }) => (
  <Wrapper>
    <Text>
      {title && <h2>{title}</h2>}
      {children && <Subtitle>{children}</Subtitle>}
    </Text>
  </Wrapper>
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
  title: null
};
