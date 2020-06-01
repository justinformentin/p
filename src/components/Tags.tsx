import React from 'react';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { darken } from 'polished';

const TagsContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  a {
    background: ${props => props.theme.tint.black};
    color: ${props => props.theme.colors.black.light};
    font-size: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    margin: 0.3rem 0.5rem 0.3rem 0;
    white-space: nowrap;
    &:hover {
      background: ${props => darken(0.35, props.theme.tint.black)};
      color: ${props => darken(0.35, props.theme.colors.black.light)};
    }
  }
`;

const Tags = ({ tags }) => (
  <TagsContainer>
    {tags &&
      tags.map(tag => (
        <Link key={tag} to={`/tags/${kebabCase(tag)}`}>
          <span>{tag}</span>
        </Link>
      ))}
  </TagsContainer>
);

export default Tags;

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  center: PropTypes.any,
};

Tags.defaultProps = {
  center: null,
};
