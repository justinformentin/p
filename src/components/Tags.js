import React from 'react';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { TagsContainer } from '../styles/shared';

const Tags = ({ tags }) => (
  <TagsContainer>
    {tags &&
      tags.map((tag) => (
        <Link key={tag} to={`/tags/${kebabCase(tag)}`}>
          <span>{tag}</span>
        </Link>
      ))}
  </TagsContainer>
);

export default Tags;

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};
