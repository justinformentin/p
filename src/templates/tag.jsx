import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';
import Helmet from 'react-helmet';
import { Layout } from 'elements';
import { Header, ItemTagCategory } from 'components';
import { Container } from 'styles/shared'


import config from '../../config/website';

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.white.light};
`;

const Tag = ({
  pageContext: { tag },
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Helmet title={`${tag} | ${config.siteTitle}`} />
    <Header title={tag}>
      <StyledLink to="/tags">All Tags</StyledLink>
    </Header>
    <Container>
      {edges.map(edge => (
        <ItemTagCategory
          key={edge.node.frontmatter.title}
          title={edge.node.frontmatter.title}
          category={edge.node.frontmatter.category}
          path={edge.node.fields.slug}
          date={edge.node.frontmatter.date}
          timeToRead={edge.node.timeToRead}
          // tags={edge.node.frontmatter.tags}
          excerpt={edge.node.excerpt}
        />
      ))}
    </Container>
  </Layout>
);

export default Tag;

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 300)
          timeToRead
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            category
          }
        }
      }
    }
  }
`;
