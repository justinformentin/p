import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Layout, PostItem, Header } from '../components';
import { Container, Base, PostWrapper } from '../styles/shared';
import config from '../../config/website';

const General = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Helmet title={`General | ${config.siteTitle}`} />
    <Header title="General" />
    <Container>
      <Base>
        {edges.map((post) => (
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

export default General;

General.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query GeneralQuery {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "general" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 175)
          timeToRead
          frontmatter {
            kind
            title
            # date(formatString: "MMMM DD, YYYY")
            date
            category
            tags
            chunk
          }
        }
      }
    }
  }
`;
