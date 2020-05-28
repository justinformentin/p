import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { Layout, PostItem } from 'elements';
import { Container } from 'styles/shared';
import { Header } from 'components';
import config from '../../config/website';

const Base = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 auto;
  &::after {
    content: '';
    flex: 0 0 32%;
  }
`;

const PostWrapper = styled.div`
  height: 100%;
  margin-bottom: 2rem;
  flex-basis: calc(99.9% * 1 / 3 - 2.5rem);
  max-width: calc(99.9% * 1 / 3 - 2.5rem);
  width: calc(99.9% * 1 / 3 - 2.5rem);
  @media (max-width: 1340px) {
    height: 17rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    &:nth-child(n) {
      flex-basis: calc(99.9% * 1 / 2 - 1rem);
      max-width: calc(99.9% * 1 / 2 - 1rem);
      width: calc(99.9% * 1 / 2 - 1rem);
      height: 15rem;
    }
  }
  @media (max-width: 1080px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 800px) {
    &:nth-child(n) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
      height: 13rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    &:nth-child(n) {
      height: 15rem;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    &:nth-child(n) {
      height: 15rem;
    }
  }
`;

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
      <Header title="Blog" />
      <Container small={true}>
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
          excerpt(pruneLength: 200)
          frontmatter {
            kind
            chunk
            title
            category
            tags
            date(formatString: "M-DD-YY")
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
          excerpt(pruneLength: 200)
          frontmatter {
            kind
            chunk
            title
            category
            tags
            date(formatString: "M-DD-YY")
          }
        }
      }
    }
  }
`;
