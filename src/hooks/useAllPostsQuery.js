import { useStaticQuery, graphql } from 'gatsby';

export const useAllPostsQuery = () => {
  const q = useStaticQuery(
    graphql`
      query AllPostQuery {
        code: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "code" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                kind
                tags
                category
                title
                chunk
              }
              fields {
                slug
              }
            }
          }
        }
        general: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "general" } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                kind
                tags
                category
                title
                chunk
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );
  return q;
};