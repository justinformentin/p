import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: transparent;
    margin-top: 2rem;
    @media (max-width: 900px) {
    margin-top: 0.5rem;
  }

  // background: linear-gradient( 0deg,rgb(255 60 0 / 15%), rgb(191 172 0 / 10%), rgba(0,0,0,0.1) );
`;

const TitleText = styled.div`
  color: var(--color-text);
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

const TitleSubtitle = styled.div`
  margin: 0;
`;

const Title = ({ children, title }) => (
  <TitleWrapper id="header-container">
    <TitleText>
      {title && <h2>{title}</h2>}
      {children && <TitleSubtitle>{children}</TitleSubtitle>}
    </TitleText>
  </TitleWrapper>
);

export default Title;

Title.propTypes = {
  children: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  big: PropTypes.bool,
};

Title.defaultProps = {
  big: false,
  children: false,
  title: null,
};
