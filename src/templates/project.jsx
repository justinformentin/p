import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { SEO, Container, Content, Line, Layout } from 'elements';
import { Hero, InfoText } from 'utilities';
import { Suggestions, Button, Card } from 'components';

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

const H1 = styled.h1`
  font-size: 3rem;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);
`;

const ButtonCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  transform: translateY(-1rem);
  @media (max-width: ${props => props.theme.breakpoints.xm}) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  a {
    padding-left: 1rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
  ${Card} {
    color: ${props => props.theme.colors.black.base} !important;
    margin-bottom: 2rem;
    text-align: center;
    flex-basis: calc(99.9% * 1 / 2 - 1rem);
    max-width: calc(99.9% * 1 / 2 - 1rem);
    width: calc(99.9% * 1 / 2 - 1rem);
    @media (max-width: 750px) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
`;

const Project = ({ pageContext: { slug, left, right }, data: { markdownRemark: postNode } }) => {
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
          <H1>{post.title}</H1>
          <H2>{post.chunk}</H2>
        </Hero>
        <Img fluid={fluid} />
      </Wrapper>
      <Container type="article">
        <CardWrapper>
          <Card>
            <h3>Tools Used</h3>
            {post.task}
          </Card>
          <ButtonCard>
            {post.time && (
              <a href={post.time}>
                <Button type="primary"> View Site</Button>
              </a>
            )}
            {post.customer && (
              <a href={post.customer}>
                <Button type="primary"> View Code</Button>
              </a>
            )}
          </ButtonCard>
        </CardWrapper>
        <Content input={postNode.html} />
        <Line aria-hidden="true" />
        <InfoText>More Projects</InfoText>
        <Suggestions left={left} right={right} />
      </Container>
    </Layout>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        chunk
        date(formatString: "DD.MM.YYYY")
        customer
        task
        time
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
