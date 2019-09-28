import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'react-emotion';
import { Container, Layout } from 'elements';
import { Header } from 'components';
import config from '../../config/website';
import BlogList from '../components/BlogList';

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

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Helmet title={`Blog | ${config.siteTitle}`} />
    <Header
      big
      height="medium"
      medium
      title="Blog"
      colone="Early on in my days of learning, I realized that documentation
      was an integral part of any project. I'm also a firm believer that the
      best way to learn anything is to teach it."
      coltwo="So I'm putting some of my projects into blog and tutorial
      format. My goal is to both help myself, as well as anyone else out there
      learning, and write articles that are easy to follow and can be updated."
    />
    <Container type="big">
      <Base>
        {edges.map(post => (
          <BlogList
            key={post.node.frontmatter.title}
            path={post.node.fields.slug}
            cover={post.node.frontmatter.cover.childImageSharp.fluid}
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            category={post.node.frontmatter.category}
            timeToRead={post.node.timeToRead}
            chunk={post.node.frontmatter.chunk}
            tags={post.node.frontmatter.tags}
          />
        ))}
      </Base>
    </Container>
  </Layout>
);

export default Blog;

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 175)
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            category
            tags
            chunk
            cover {
              childImageSharp {
                fluid(maxWidth: 900, quality: 85, traceSVG: { color: "#2B2B2F" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
