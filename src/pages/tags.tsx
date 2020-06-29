import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { Helmet } from 'react-helmet';
import { Header, Layout } from '../components';
import { Container, TagsContainer, Number } from '../styles/shared';
import config from '../../config/website';

const Tags = ({
  data: {
    code: { group: codeGroup },
    general: { group: generalGroup },
  },
}) => {
  const allTags = [...codeGroup, ...generalGroup];
  return (
    <Layout>
      <Helmet title={`Tags | ${config.siteTitle}`} />
      <Header title="Tags" />
      <Container>
        <TagsContainer>
          {allTags.map(tag => (
            <Link
              key={tag.fieldValue}
              to={`/tags/${kebabCase(tag.fieldValue)}`}
            >
              <span>
                {tag.fieldValue} <Number>{tag.totalCount}</Number>
              </span>
            </Link>
          ))}
        </TagsContainer>
      </Container>
    </Layout>
  );
};
export default Tags;

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.array.isRequired,
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query TagsPage {
    code: allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "code" } } }
    ) {
      group(field: frontmatter___tags) {
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
      group(field: frontmatter___tags) {
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
