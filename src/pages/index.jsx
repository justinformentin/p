import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "react-emotion";
import { Container, Layout, PostItem } from "elements";
import { Button } from "components";

const MorePostsLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  margin: 2rem 0 3rem 0;
`;

const Index = ({
  data: {
    // projects: { edges: projectEdges },
    posts: { edges: postEdges },
  }
}) => (
  <Layout edges={postEdges}>
        <Container>
          {postEdges.map(post => {
            return <PostWrapper>
              <PostItem
              key={post.node.frontmatter.title}
              // date={post.node.frontmatter.date}
              path={post.node.fields.slug}
              // title={post.node.frontmatter.title}
              // category={post.node.frontmatter.category}
              // chunk={post.node.frontmatter.chunk}
              // tags={post.node.frontmatter.tags}
            post={post.node.frontmatter}
              excerpt={post.node.excerpt}
              timeToRead={'Time to read: ' + post.node.timeToRead}
            />
            </PostWrapper>
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
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 6
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
            # date(formatString: "MM-DD-YYYY")
            date(formatString: "MMMM DD, YYYY")

          }
        }
      }
    }
  }
`;
