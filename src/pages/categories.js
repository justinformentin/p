import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { Helmet } from 'react-helmet';
import { Title, Layout } from '../components';
import config from '../../config/website';
import { Container, TagsContainer, Number } from '../styles/shared';


const Categories = ({
  data: {
    code: { group: codeGroup },
    general: { group: generalGroup },
  },
}) => {
  const allCats = [...codeGroup, ...generalGroup];

  return (
    <Layout>
      <Helmet title={`Categories | ${config.siteTitle}`} />
      <Title title="Categories" />
      <Container>
        <TagsContainer>
          {allCats.map(category => (
            <Link
              key={category.fieldValue}
              to={`/categories/${kebabCase(category.fieldValue)}`}
            >
              <span>
                {category.fieldValue} <Number>{category.totalCount}</Number>
              </span>
            </Link>
          ))}
        </TagsContainer>
      </Container>
    </Layout>
  );
};

export default Categories;

Categories.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.array.isRequired,
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query CategoriesPage {
    code: allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "code" } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      edges {
        node {
          id
        }
      }
    }
    general: allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "general" } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      edges {
        node {
          id
        }
      }
    }
  }
`;
