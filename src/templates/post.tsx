import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Centered, Container, InfoText, Line } from '../styles/shared';
import { Tags, Suggestions, Header, SEO, Content, Layout, PostItem  } from '../components';

const Post = ({
  pageContext: { slug, left, right },
  data: { markdownRemark: postNode },
}) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
      <Header>
        <Centered>
          <PostItem post={post} timeToRead={postNode.timeToRead} />
        </Centered>
      </Header>
      <Container>
        <Content input={postNode.html} />
        <Line aria-hidden="true" />
        <Tags tags={post.tags} />
        <InfoText>More Posts</InfoText>
        <Suggestions left={left} right={right} />
      </Container>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        kind
        title
        # date @dateformat(formatString: "MMMM DD, YYYY")
        date
        category
        tags
      }
      fields {
        slug
        sourceInstanceName
      }
    }
  }
`;
