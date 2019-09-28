import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Img from 'gatsby-image';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { SEO, Container, Content, Line, Layout } from 'elements';
import { Hero, InfoText } from 'utilities';
import { Tags, Suggestions } from 'components';

const Wrapper = styled.div`
  height: 400px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 500px;
    .gatsby-image-wrapper {
      height: 500px;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 400px;
    .gatsby-image-wrapper {
      height: 400px;
    }
  }
`;

const Information = styled.div`
  font-family: ${props => props.theme.fontFamily.heading};
  color: ${props => props.theme.colors.white.lightblue};
`;

const lightLine = css`
  padding: 0 0.5rem;
  color: #999999;
`;

const CatWrap = styled(Link)`
  margin: 1rem;
`;

const H1 = styled.h1`
  font-size: 4rem;
`;

const Category = styled.span`
  border: 2px solid ${props => props.theme.colors.white.lightblue};
  border-radius: 50px;
  padding: 0.25rem 0.6rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s ease;
  &:hover {
    border: 2px solid ${props => props.theme.colors.white.light};
    background: ${props => props.theme.colors.white.light};
    a {
      color: black};
      transition: color 0.2s;
      transition: background 0.2s;
    }
  }
  a {
    color: ${props => props.theme.colors.white.light};
  }
`;

const Post = ({ pageContext: { slug, left, right }, data: { markdownRemark: postNode } }) => {
  const post = postNode.frontmatter;
  const { fluid } = post.cover.childImageSharp;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Wrapper>
        <Hero>
          <CatWrap>
            <Category>
              <Link to={`/categories/${kebabCase(post.category)}`}>{post.category}</Link>
            </Category>
          </CatWrap>
          <H1>{post.title}</H1>
          <Information>
            By Justin Formentin <span className={lightLine}>|</span>
            {post.date}
            <span className={lightLine}>|</span>
            Time to read: {postNode.timeToRead} Min.
          </Information>
        </Hero>
        <Img fluid={fluid} />
      </Wrapper>
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
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
        cover {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90, duotone: { highlight: "#2f61a8", shadow: "#1a355b", opacity: 90 }) {
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
