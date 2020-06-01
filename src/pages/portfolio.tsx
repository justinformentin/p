import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout, ProjectList, Header } from '../components';
import config from '../../config/website';
import { Container } from '../styles/shared';

const Base = styled.div`
  column-gap: 2rem;
  column-width: 400px;
  transform: translateY(-6rem);
  margin-bottom: -2rem;
`;

const Portfolio = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <Helmet title={`Portfolio | ${config.siteTitle}`} />
    <Header title="Portfolio" />
    <Container>
      <Base>
        {edges.map(project => (
          <ProjectList
            key={project.node.frontmatter.title}
            path={project.node.fields.slug}
            cover={project.node.frontmatter.cover.childImageSharp.fluid}
            title={project.node.frontmatter.title}
          />
        ))}
      </Base>
    </Container>
  </Layout>
);

export default Portfolio;

Portfolio.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 900
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
  }
`;
