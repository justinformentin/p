import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin: 2rem 3rem 4rem 3rem;
  margin-top: 2rem;
  justify-content: center;
  text-align: center;
`;

const Information = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: var(--theme-text);
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: var(--theme-grey);
    }
  }
`;

const Statistics = styled.div`
  color: var(--theme-grey);
  margin-bottom: 1rem;
  a{
    color: var(--theme-text);
  }
`;

const Excerpt = styled.div`
  margin-top: 1rem;
`;

const ItemTagCategory = ({ category, path, title, date, excerpt }) => (
  <Wrapper>
    <Information>
      <Link to={path}>
        <h1>{title}</h1>
      </Link>
      <Statistics>
        {date} | Category:{' '}
        <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
      </Statistics>
      <Excerpt>{excerpt}</Excerpt>
    </Information>
  </Wrapper>
);

export default ItemTagCategory;

ItemTagCategory.propTypes = {
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};
