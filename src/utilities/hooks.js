// import { useStaticQuery, graphql } from "gatsby";

// export const useCodeCats = () => {
//   const { allMarkdownRemark } = useStaticQuery(
//     graphql`
//       query CategoriesCodeQuery {
//         allMarkdownRemark(
//           filter: { fields: { sourceInstanceName: { eq: "general" } } }
//         ) {
//           group(field: frontmatter___category) {
//             fieldValue
//             totalCount
//           }
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     `
//   );
//   return allMarkdownRemark.group;
// };

// export const useGeneralCats = () => {
//   const { allMarkdownRemark } = useStaticQuery(
//     graphql`
//       query CategoriesGeneralQuery {
//         allMarkdownRemark(
//           filter: { fields: { sourceInstanceName: { eq: "code" } } }
//         ) {
//           group(field: frontmatter___category) {
//             fieldValue
//             totalCount
//           }
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     `
//   );
//   return allMarkdownRemark.group;
// };

// export const useCodeTags = () => {
//   const { allMarkdownRemark } = useStaticQuery(
//     graphql`
//       query TagsCodeQuery {
//         allMarkdownRemark(
//           filter: { fields: { sourceInstanceName: { eq: "code" } } }
//         ) {
//           group(field: frontmatter___tags) {
//             fieldValue
//             totalCount
//           }
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     `
//   );
//   return allMarkdownRemark.group;
// };

// export const useGeneralTags = () => {
//   const { allMarkdownRemark } = useStaticQuery(
//     graphql`
//       query TagsGeneralQuery {
//         allMarkdownRemark(
//           filter: { fields: { sourceInstanceName: { eq: "general" } } }
//         ) {
//           group(field: frontmatter___tags) {
//             fieldValue
//             totalCount
//           }
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     `
//   );
//   return allMarkdownRemark.group;
// };
