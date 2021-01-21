import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import {
  SEO,
  Content,
  Layout,
  Suggestions,
  Button,
  Title,
} from '../components';
import { Container, InfoText, Line, Card } from '../styles/shared';

const H1 = styled.h1`
  color: #222;
  font-size: 2rem;
`;

const H2 = styled.h2`
  color: #222;
  font-size: 1.25rem;
`;

const ButtonCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  transform: translateY(-1rem);
  @media (max-width: ${(props) => props.theme.breakpoints.xm}) {
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
  ${Card} {
    color: ${(props) => props.theme.colors.black.base} !important;
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

const Project = ({
  pageContext: { slug, left, right },
  data: { markdownRemark: postNode },
}) => {
  const post = postNode.frontmatter;
  // const { fluid } = post.cover.childImageSharp;
  if (!post.id) {
    post.id = slug;
  }
  console.log('post.title', post.title);
  return (
    <Layout>
      {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
      <Title>
        <H1>{post.title}</H1>
        <H2>{post.chunk}</H2>
      </Title>
      <Container>
        <CardWrapper>
          <Card>
            <h3>Tools Used</h3>
            {post.task}
          </Card>
          <ButtonCard>
            {post.time && (
              <a href={post.time}>
                <Button> View Site</Button>
              </a>
            )}
            {post.customer && (
              <a href={post.customer}>
                <Button> View Code</Button>
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
        # date @dateformat(formatString: "DD.MM.YYYY")
        date
        customer
        task
        time
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
