import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'react-emotion';
import theme from '../../config/theme';

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${theme.borderRadius.default};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding: 1rem;
  color: ${theme.colors.white.light};
  background: rgba(13, 49, 102, 0.35);
  h2 {
    margin-bottom: 0;
    text-shadow: ${theme.shadow.text.small};
  }
  &:hover {
    color: ${theme.colors.white.light};
  }
`;
// background: linear-gradient(
//   to bottom,
//   rgba(13, 49, 102, 0.1) 0%,
//   rgba(13, 49, 102, 0.35) 20%,
//   rgba(13, 49, 102, 0.55) 50%,
//   rgba(13, 49, 102, 0.35) 80%,
//   rgba(13, 49, 102, 0.1) 100%
// );

// background: rgba(13, 49, 102, 0.35);
const Wrapper = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
  border-radius: ${props => props.theme.borderRadius.default};
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.04);
  }
`;

const Text = styled.div`
  margin: auto;
  text-align: center;
`;

const ProjectList = ({ cover, path, title }) => (
  <Wrapper>
    <Img fluid={cover} />
    <StyledLink to={path}>
      <Text>
        <h2>{title}</h2>
      </Text>
    </StyledLink>
  </Wrapper>
);

export default ProjectList;

ProjectList.propTypes = {
  cover: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
