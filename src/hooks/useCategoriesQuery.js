import { useStaticQuery, graphql } from 'gatsby';

export const useCategoriesQuery = () => {
  const q = useStaticQuery(
    graphql`
      query AllCatsQuery {
        code: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "code" } } }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
          edges {
            node {
              id
            }
          }
        }
        general: allMarkdownRemark(
          filter: { fields: { sourceInstanceName: { eq: "general" } } }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );
  return q;
};
