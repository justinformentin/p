import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { ItemTagCategory, Layout } from '../components';
import { MaxWidth, Heading } from '../styles/shared';
import config from '../../config/website';

export default ({ pageContext, data }) => {
  return (
    <Layout>
      <Helmet title={`${pageContext.tag} | ${config.siteTitle}`} />
      <Heading>{pageContext.tag}</Heading>
      <MaxWidth>
        {data.allMarkdownRemark.edges.map((edge) => {
          // console.log('edge.node', edge.node);
          return (
            <ItemTagCategory
              key={edge.node.frontmatter.title}
              title={edge.node.frontmatter.title}
              category={edge.node.frontmatter.category}
              path={edge.node.fields.slug}
              date={edge.node.frontmatter.date}
              ttr={edge.node.timeToRead}
              // tags={edge.node.frontmatter.tags}
              excerpt={edge.node.excerpt}
              chunk={edge.node.frontmatter.chunk}
            />
          );
        })}
      </MaxWidth>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 300)
          timeToRead
          frontmatter {
            kind
            title
            tags
            chunk
            # date @dateformat(formatString: "MMMM DD, YYYY")
            date
            category
          }
        }
      }
    }
  }
`;
