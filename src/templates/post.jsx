import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";
import { Link, graphql } from "gatsby";
import kebabCase from "lodash/kebabCase";
import { SEO, Container, Content, Line, Layout } from "elements";
import { InfoText } from "utilities";
import { Tags, Suggestions, Header } from "components";

const Information = styled.div`
  font-family: ${props => props.theme.fontFamily.heading};
  color: ${props => props.theme.colors.white.lightblue};
`;

const lightLine = css`
  padding: 0 0.5rem;
  color: #999999;
`;

const CatLink = styled(Link)`
  padding: 0.5rem;
`;
const H1 = styled.h1`
  font-size: 2.25rem;
  color: white;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


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
        <TitleContainer>
          <H1>{post.title}</H1>
          <Information>
            {post.date}
            <span className={lightLine}>|</span>
            Time to read: {postNode.timeToRead} Min.
            <span className={lightLine}>|</span>
            <Link to={`/categories/${post.category}`}>{post.category}</Link>
          </Information>
        </TitleContainer>
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
