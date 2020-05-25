import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { Link, graphql } from "gatsby";
import { SEO, Container, Content, Line, Layout, PostItem } from "elements";
import { InfoText } from "utilities";
import { Centered } from 'styles/shared';
import { Tags, Suggestions, Header } from "components";

const Post = ({
  pageContext: { slug, left, right },
  data: { markdownRemark: postNode }
}) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Header>
        <Centered>
          <PostItem post={post} timeToRead={postNode.timeToRead} />
        </Centered>
      </Header>
      <Container pt3 type="article">
        <Content input={postNode.html} />
        <Line aria-hidden="true" />
        <Tags center tags={post.tags} />
        <InfoText>More Posts</InfoText>
        <Suggestions left={left} right={right} secondary />
      </Container>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
        cover {
          childImageSharp {
            fluid(
              maxWidth: 1920
              quality: 90
              duotone: { highlight: "#2f61a8", shadow: "#1a355b", opacity: 90 }
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1200, quality: 90) {
              src
            }
          }
        }
      }
      fields {
        slug
        sourceInstanceName
      }
    }
  }
`;
