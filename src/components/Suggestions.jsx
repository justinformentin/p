import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import theme from '../../config/theme';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Wrapper = styled.article`
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  height: 13rem;
  &:hover {
    transform: scale(1.04);
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
  }
  flex-basis: calc(99.9% * 1 / 2 - 1rem);
  max-width: calc(99.9% * 1 / 2 - 1rem);
  width: calc(99.9% * 1 / 2 - 1rem);
  @media (max-width: 500px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    height: 12rem;
    &:first-child {
      margin-bottom: 2rem;
    }
  }
`;

const StyledLink = styled(Link)`
  border-radius: ${props => props.theme.borderRadius.default};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 3;
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(13, 49, 102, 0.35);
    z-index: -10;
    rgba(13, 49, 102, 0.35);
    transition: opacity ${theme.transitions.default.duration};
    border-radius: ${props => props.theme.borderRadius.default};
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
    object-fit: cover;
    width: 100%;
    height: 100%;
    }
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.white.base};
  text-align: center;
  margin-bottom: 0;
  text-shadow: ${props => props.theme.shadow.text.small};
`;

const Suggestions = ({ left, right }) => (
  <Row>
    {left && (
      <Wrapper>
        <Image>
          <img src={left.frontmatter.cover.childImageSharp.resize.src} alt={left.frontmatter.title} />
        </Image>
        <StyledLink to={left.fields.slug}>
          <Title>{left.frontmatter.title}</Title>
        </StyledLink>
      </Wrapper>
    )}

    {right && (
      <Wrapper>
        <Image>
          <img src={right.frontmatter.cover.childImageSharp.resize.src} alt={right.frontmatter.title} />
        </Image>
        <StyledLink to={right.fields.slug}>
          <Title>{right.frontmatter.title}</Title>
        </StyledLink>
      </Wrapper>
    )}
  </Row>
);

export default Suggestions;

Suggestions.propTypes = {
  left: PropTypes.any.isRequired,
  right: PropTypes.any.isRequired,
};
