import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'react-emotion';
import theme from '../../config/theme';

const Wrapper = styled.article`
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.default};
  box-shadow: ${props => props.theme.shadow.feature.big.default};
  transition: ${props => props.theme.transitions.boom.transition};
  height: 17rem;
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.big.hover};
    transform: scale(1.04);
    }
  }
  flex-basis: calc(99.9% * 1 / 3 - 2.5rem);
  max-width: calc(99.9% * 1 / 3 - 2.5rem);
  width: calc(99.9% * 1 / 3 - 2.5rem);
  @media (max-width: 1340px) {
    height: 17rem;
  }

  @media (max-width: 840px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 2rem;
    margin-right: 5rem;
    margin-left: 5rem;
    height: 15rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    &:nth-child(n) {
      height: 12.5rem;
      margin-right: 2rem;
      margin-left: 2rem;
    }
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    background: rgba(13, 49, 102, 0.3);
    z-index: -10;
    border-radius: ${theme.borderRadius.default};
    transition: opacity ${theme.transitions.default.duration};
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;
// background: linear-gradient(to bottom,rgba(35,35,35,.5),rgba(35,35,35,0.1) 100%);
// background: rgba(13, 49, 102, 0.3);
const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Information = styled.div`
  margin: auto;
  text-align: center;
  text-shadow: ${theme.shadow.text.small};
`;

const Date = styled.div`
  color: ${props => props.theme.colors.white.light};
  padding-bottom: 0.25rem;
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.white.light};
  font-size: 2rem;
  margin: auto;
  text-align: center;
`;

const FeaturedPost = ({ cover, path, date, title }) => (
  <Wrapper>
    <Image>
      <Img fluid={cover} />
    </Image>
    <StyledLink to={path}>
      <Information>
        <Date>{date}</Date>
        <Title>{title}</Title>
      </Information>
    </StyledLink>
  </Wrapper>
);

export default FeaturedPost;

FeaturedPost.propTypes = {
  cover: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
