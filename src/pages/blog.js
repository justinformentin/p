import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import {Layout, PostItem, Title} from '../components';
import { Container, Base, PostWrapper } from '../styles/shared';
import config from '../../config/website';

const Blog = ({
  data: {
    code: { edges: codeEdges },
    general: { edges: generalEdges },
  },
}) => {
  const allEdges = [...codeEdges, ...generalEdges];
  const sortedEdges = allEdges.sort((a, b) => {
    const ae = new Date(a.node.frontmatter.date);
    const be = new Date(b.node.frontmatter.date);
    return ae < be ? 1 : ae > be ? -1 : 0;
  });
  return (
    <Layout>
      <Helmet title={`Blog | ${config.siteTitle}`} />
      <Title title="Writing" />
      <Container>
        <Base>
          {sortedEdges.map(post => (
            <PostWrapper key={post.node.frontmatter.title}>
              <PostItem
                post={post.node.frontmatter}
                path={post.node.fields.slug}
                chunk={post.node.frontmatter.chunk}
                timeToRead={post.node.timeToRead}
              />
            </PostWrapper>
          ))}
        </Base>
      </Container>
    </Layout>
  );
};

export default Blog;

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query Blog {
    code: allMarkdownRemark(
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "code" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            kind
            chunk
            title
            category
            tags
            # date @dateformat(formatString: "M-DD-YY")
            date
          }
        }
      }
    }
    general: allMarkdownRemark(
      limit: 100
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "general" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            kind
            chunk
            title
            category
            tags
            # date @dateformat(formatString: "M-DD-YY")
            date
          }
        }
      }
    }
  }
`;
