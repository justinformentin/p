import { useStaticQuery, graphql } from 'gatsby';
// code: allMdx(
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
              headings {
                depth
                value
              }
              wordCount {
                paragraphs
                sentences
                words
              }
              timeToRead
              tableOfContents
              excerpt(pruneLength: 150)
              frontmatter {
                kind
                tags
                category
                title
                chunk
                date
                published
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
              headings {
                depth
                value
              }
              wordCount {
                paragraphs
                sentences
                words
              }
              timeToRead
              tableOfContents
              excerpt(pruneLength: 150)
              frontmatter {
                kind
                tags
                category
                title
                chunk
                date
                published
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
  // console.log('q', q);
  return q;
};


// snippets: allMarkdownRemark(
//   filter: { fields: { sourceInstanceName: { eq: "snippets" } } }
//   sort: { fields: [frontmatter___date], order: DESC }
// ) {
//   edges {
//     node {
//       frontmatter {
//         lang
//         title
//         date
//         chunk
//         published
//       }
//       fields {
//         slug
//       }
//     }
//   }
// }