/* eslint max-len: 0 */

import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "react-emotion";
import { Container, Layout, Sidebar } from "elements";
import { Button } from "components";
import kebabCase from "lodash/kebabCase";

// const ProjectsWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   flex-direction: row;
//   margin-top: -7rem;
// `;

const PostsWrapper = styled.div`
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  margin: 0 2rem;
`;


const PostItem = styled.article`
  display: flex;
  flex-direction: column;
  margin: 2rem 3rem 3rem 3rem;
`;

const Information = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    display: inline-block;
    color: ${props => props.theme.colors.black.base};
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: #666666;
    }
  }
`;

const Statistics = styled.div`
  color: ${props => props.theme.colors.black.lighter};
  margin-bottom: 0.5rem;
`;

const Excerpt = styled.div`
  margin-top: 0.5rem;
`;

const MorePostContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PostList = ({ category, path, title, date, excerpt }) => (
  <PostItem>
    <Information>
      <Link to={path}>
        <h1>{title}</h1>
      </Link>
      <Statistics>
        {date} |{" "}
        <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
      </Statistics>
      <Excerpt>{excerpt}</Excerpt>
    </Information>
  </PostItem>
);

const Index = ({
  data: {
    // projects: { edges: projectEdges },
    posts: { edges: postEdges },
  }
}) => (
  <Layout edges={postEdges}>
        <PostsWrapper>
          {postEdges.map(post => (
            <PostList
              key={post.node.frontmatter.title}
              date={post.node.frontmatter.date}
              path={post.node.fields.slug}
              title={post.node.frontmatter.title}
              category={post.node.frontmatter.category}
              chunk={post.node.frontmatter.chunk}
              tags={post.node.frontmatter.tags}
              excerpt={post.node.excerpt}
              timeToRead={post.node.timeToRead}
            />
          ))}
        </PostsWrapper>
          <MorePostContainer>
            <Link to="/blog">
              <Button large type="primary">
                More Posts
              </Button>
            </Link>
          </MorePostContainer>
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
            date(formatString: "MM-DD-YYYY")
          }
        }
      }
    }
  }
`;
