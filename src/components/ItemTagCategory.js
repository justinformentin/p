import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { PostDetails } from './PostDetails';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  justify-content: center;
  text-align: center;
`;

const Information = styled.div`
  h2 {
    color: var(--color-text);
    margin-bottom: 0.5rem;
    transition: ${(props) => props.theme.trans.all};
    &:hover {
      color: var(--color-grey);
    }
  }
`;

const Statistics = styled.div`
  color: var(--color-grey);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  font-size: 20px;
  a {
    color: var(--color-text);
  }
`;

const Excerpt = styled.div`
  margin-top: 1rem;
`;

const ItemTagCategory = ({ category, path, title, date, chunk, ttr }) => {
  console.log('chunk', chunk)
  return (
  <Wrapper>
    <Information>
      <Link to={path}>
        <h2>{title}</h2>
      </Link>
      <Statistics>
      <PostDetails date={date} ttr={ttr} />

        {/* {date} | Category:{' '} */}
        {/* <Link to={`/categories/${kebabCase(category)}`}>{category}</Link> */}
      </Statistics>
      <Excerpt>{chunk}</Excerpt>
    </Information>
  </Wrapper>
);
  }
export default ItemTagCategory;

ItemTagCategory.propTypes = {
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};
