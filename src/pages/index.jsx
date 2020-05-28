import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'react-emotion';
import { Container, Layout, PostItem } from 'elements';
import { Button, Header } from 'components';

const MorePostsLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  margin: 0 0 3rem 0;
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
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  margin-bottom: 0.5rem;
  display: flex;
`;

const PostKindWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

const PostKind = styled.div`
  display: inline;
  background: grey;
  border-radius: 5px;
  color: white;
  padding: 0.25rem;
  font-size: 0.7rem;
`;
const ColumnItem = (name, arr) => (
  <>
    <ColumnTitle>{name}</ColumnTitle>
    <Row>
      {arr.map(({ node }) => (
        <React.Fragment key={node.frontmatter.title}>
          <Column className="column-container">
            <PostKindWrapper>
              <PostKind>{node.frontmatter.kind}</PostKind>
            </PostKindWrapper>
            <PostWrapper>
              <PostItem
                path={node.fields.slug}
                post={node.frontmatter}
                excerpt={node.excerpt}
                timeToRead={'Time to read: ' + node.timeToRead}
              />
            </PostWrapper>
          </Column>
        </React.Fragment>
      ))}
    </Row>
  </>
);
const Index = ({
  data: {
    code: { edges: codeEdges },
    general: { edges: generalEdges },
  },
}) => {
  const findArticle = edges =>
    edges.find(item => item.node.frontmatter.kind === 'Article');
  const findRandom = edges =>
    edges.find(item => item.node.frontmatter.kind === 'Random');
  const code = [findArticle(codeEdges), findRandom(codeEdges)];
  const general = [findArticle(generalEdges), findRandom(generalEdges)];

  return (
    <Layout>
      <Header title="Recent Posts" />
      <Container>
        <RowWrapper>
          {/* <ColumnTitle>Code</ColumnTitle> */}

          {ColumnItem('Code', code)}
          {/* <ColumnTitle>Everything Else</ColumnTitle> */}

          {ColumnItem('Everything Else', general)}
        </RowWrapper>
        <MorePostsLink to="/blog">
          <Button large type="primary">
            More Posts
          </Button>
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
          excerpt(pruneLength: 200)
          frontmatter {
            kind
            chunk
            title
            category
            tags
            date(formatString: "MMMM DD, YYYY")
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
          excerpt(pruneLength: 200)
          frontmatter {
            kind
            chunk
            title
            category
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
