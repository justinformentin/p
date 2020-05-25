import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "react-emotion";
import { Container, Layout, PostItem } from "elements";
import { Button, Header } from "components";

const MorePostsLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  margin: 2rem 0 3rem 0;
`;

const Index = ({
  data: {
    posts: { edges: postEdges }
  }
}) => (
  <Layout edges={postEdges}>
    <Header title="Recent Posts" />
    <Container>
      {postEdges.map(post => {
        return (
          <PostWrapper key={post.node.frontmatter.title}>
            <PostItem
              path={post.node.fields.slug}
              post={post.node.frontmatter}
              excerpt={post.node.excerpt}
              timeToRead={"Time to read: " + post.node.timeToRead}
            />
          </PostWrapper>
        );
      })}
      <MorePostsLink to="/blog">
        <Button large type="primary">
          More Posts
        </Button>
      </MorePostsLink>
    </Container>
  </Layout>
);

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.shape({
      edges: PropTypes.array.isRequired
    }),
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired
    })
  }).isRequired
};

export const pageQuery = graphql`
  query IndexQuery {
    projects: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            chunk
            customer
            title
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 1
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          excerpt(pruneLength: 200)
          frontmatter {
            chunk
            title
            category
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
