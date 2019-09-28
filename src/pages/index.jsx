/* eslint max-len: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';
import { Container, Layout } from 'elements';
import { Github, Linkedin, Twitter } from 'icons';
import { FeaturedProject, FeaturedPost, Header, Button } from 'components';

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  margin-top: -7rem;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Text = styled.p`
  text-align: center;
  font-family: ${props => props.theme.fontFamily.heading};
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.5rem;
  max-width: 850px;
  margin: 3rem auto;
  text-shadow: ${props => props.theme.shadow.text.big};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    margin-top: 1rem;
  }
`;

const IconLink = styled.a`
  margin: 2rem 1rem 0 1rem;
  }
`;

const IconContainer = styled.div`
  padding-top: 0rem;
  display: flex;
  transform: translateY(-25px);
`;

const Wrap = styled.div`
  margin-bottom: 3rem;
`;

const Index = ({
  data: {
    projects: { edges: projectEdges },
    posts: { edges: postEdges },
    imageOne,
  },
}) => (
  <Layout>
    <Header
      big
      home
      height="large"
      img={imageOne.childImageSharp.fluid}
      subhead={<React.Fragment>Justin Formentin</React.Fragment>}
      title={
        <React.Fragment>
          Frontend Developer <br />
        </React.Fragment>
      }
      icons={
        <React.Fragment>
          <IconContainer>
            <IconLink href="https://github.com/justinformentin">
              <Github />
            </IconLink>
            <IconLink href="https://linkedin.com/in/justinformentin">
              <Linkedin />
            </IconLink>
            <IconLink href="https://twitter.com/justinformentin">
              <Twitter />
            </IconLink>
          </IconContainer>
        </React.Fragment>
      }
    />
    <Wrap>
      <Container type="big">
        <ProjectsWrapper>
          {projectEdges.map(project => (
            <FeaturedProject
              key={project.node.frontmatter.title}
              cover={project.node.frontmatter.cover.childImageSharp.fluid}
              customer={project.node.frontmatter.customer}
              path={project.node.fields.slug}
              title={project.node.frontmatter.title}
              chunk={project.node.frontmatter.chunk}
            />
          ))}
        </ProjectsWrapper>
      </Container>
      <Text>
        <Link to="/portfolio">
          <Button large type="primary">
            More Projects
          </Button>
        </Link>
      </Text>
      <Container type="big">
        <PostsWrapper>
          {postEdges.map(post => (
            <FeaturedPost
              key={post.node.frontmatter.title}
              cover={post.node.frontmatter.cover.childImageSharp.fluid}
              date={post.node.frontmatter.date}
              path={post.node.fields.slug}
              title={post.node.frontmatter.title}
              category={post.node.frontmatter.category}
              chunk={post.node.frontmatter.chunk}
            />
          ))}
        </PostsWrapper>
        <Container>
          <Text>
            <Link to="/blog">
              <Button large type="primary">
                More Posts
              </Button>
            </Link>
          </Text>
        </Container>
      </Container>
    </Wrap>
  </Layout>
);

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
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
                fluid(maxWidth: 1000, quality: 90, traceSVG: { color: "#2B2B2F" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            chunk
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 800, quality: 90, traceSVG: { color: "#2B2B2F" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            date(formatString: "MM-DD-YYYY")
            category
          }
        }
      }
    }
    imageOne: file(relativePath: { eq: "jf.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 190, quality: 90, duotone: { highlight: "#2f61a8", shadow: "#1a355b", opacity: 25 }) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`;
