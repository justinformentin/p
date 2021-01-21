import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Button, Title, Layout, PostItem } from '../components';
import { Container } from '../styles/shared';

const MorePostsLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const PostWrapper = styled.div`
  margin: 0 0 3rem 0;
  color: var(--color-text);
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin-top: 1rem;
  .column-container:nth-child(1) {
    margin-right: 1rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostKindContainer = styled.div`
  display: flex;
`;

const PostKindWrapper = styled.div`
  margin: 0 0.5rem 0.75rem 0;
  a {
    text-decoration: none;
  }
`;

const PostCat = styled.div`
  display: inline;
  background: ${(props) => (props.kind === 'Code' ? '#2c5a9c' : '#1c3b66')};
  border-radius: 5px;
  color: white;
  padding: 0.25rem;
  font-size: 0.7rem;
`;

const ColumnItem = (name, arr) => (
  <Row>
    {arr.map(({ node }) => (
      <Column className="column-container" key={node.frontmatter.title}>
        <PostKindContainer>
          <PostKindWrapper>
            <Link to={`/${name.toLowerCase()}`}>
              <PostCat kind={name}>{name}</PostCat>
            </Link>
          </PostKindWrapper>
        </PostKindContainer>
        <PostWrapper>
          <PostItem
            path={node.fields.slug}
            post={node.frontmatter}
            excerpt={node.excerpt}
            // chunk={null}
            timeToRead={'Time to read: ' + node.timeToRead}
          />
        </PostWrapper>
      </Column>
    ))}
  </Row>
);
const Index = ({
  data: {
    code: { edges: codeEdges },
    general: { edges: generalEdges },
  },
}) => {
  const findArticle = (edges) =>
    edges.find((item) => item.node.frontmatter.kind === 'Article');
  const findRandom = (edges) =>
    edges.find((item) => item.node.frontmatter.kind === 'Random');
  const code = [findArticle(codeEdges), findRandom(codeEdges)];
  const general = [findArticle(generalEdges), findRandom(generalEdges)];

  return (
    <Layout>
      <Title title="Recent Posts" />
      <Container>
        <RowWrapper>
          {ColumnItem('Code', code)}
          {ColumnItem('General', general)}
        </RowWrapper>
        <MorePostsLink to="/blog">
          <Button>More Posts</Button>
        </MorePostsLink>
      </Container>
    </Layout>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    code: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
    general: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    code: allMarkdownRemark(
      limit: 8
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "code" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          excerpt(pruneLength: 100)
          frontmatter {
            kind
            chunk
            title
            category
            tags
            # date @dateformat(formatString: "MMMM DD, YYYY")
            date
          }
        }
      }
    }
    general: allMarkdownRemark(
      limit: 8
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "general" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          excerpt(pruneLength: 100)
          frontmatter {
            kind
            chunk
            title
            category
            tags
            # date @dateformat(formatString: "MMMM DD, YYYY")
            date
          }
        }
      }
    }
  }
`;
