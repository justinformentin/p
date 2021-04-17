import { useStaticQuery, graphql } from 'gatsby';

// export const useSnippetsQuery = () => {
//   const q = useStaticQuery(
//     graphql`
//       query AllSnippetsQuery {
//         allMarkdownRemark(
//           limit: 1000
//           sort: { fields: [frontmatter___date], order: DESC }
//           filter: { fields: { sourceInstanceName: { eq: "snippets" } } }
//         ) {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//               frontmatter {
//                 lang
//                 title
//                 date
//                 chunk
//                 published
//               }
//             }
//           }
//         }
//       }
//     `
//   );
//   return q.allMarkdownRemark.edges;
// };
