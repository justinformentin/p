import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Wrapper = styled.div`
  padding: 2rem 10rem;
`;

const Container = ({ children, type, className, pt3 }) => (
  <Wrapper className={className} type={type} pt3={pt3}>
    {children}
  </Wrapper>
);

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['article', 'base', 'big']),
  className: PropTypes.any,
  pt3: PropTypes.any,
};

Container.defaultProps = {
  type: 'base',
  className: null,
  pt3: null,
};
