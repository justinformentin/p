const path = require('path');
const _ = require('lodash');

const pathPrefixes = {
  code: '/code',
  general: '/general',
  snippets: '/snippets',
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  // if (node.internal.type === 'Mdx') {
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const pathPrefix = pathPrefixes[fileNode.sourceInstanceName];
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.path)}`;
    }
    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: fileNode.sourceInstanceName,
    });
    createNodeField({ node, name: 'slug', value: `${pathPrefix}${slug}` });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.js');
    const snippetPage = path.resolve('src/templates/snippet.js');
    const tagPage = path.resolve('src/templates/tag.js');
    const categoryPage = path.resolve('src/templates/category.js');
    resolve(
      graphql(`
        {
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
                frontmatter {
                  kind
                  tags
                  category
                  title
                  chunk
                  published
                }
                fields {
                  slug
                }
              }
            }
          }
          snippets: allMarkdownRemark(
            filter: { fields: { sourceInstanceName: { eq: "snippets" } } }
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            edges {
              node {
                frontmatter {
                  lang
                  chunk
                  title
                  published
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();

        const codeList = result.data.code.edges;
        const generalList = result.data.general.edges;
        const snippetList = result.data.snippets.edges;

        const addTagsAndCats = (frontmatter) => {
          frontmatter.tags &&
            frontmatter.tags.forEach((tag) => tagSet.add(tag));
          frontmatter.category && categorySet.add(frontmatter.category);
        };

        const prevPage = (posts, idx) =>
          idx === 0 ? null : posts[idx - 1].node;

        const nextPage = (posts, idx) =>
          idx === posts.length - 1 ? null : posts[idx + 1].node;

        const createContext = (post, postList, idx) => ({
          slug: post.node.fields.slug,
          left: prevPage(postList, idx),
          right: nextPage(postList, idx),
        });

        const handleList = (list, component, post, idx) => {
          addTagsAndCats(post.node.frontmatter);
          createPage({
            path: post.node.fields.slug,
            component,
            context: createContext(post, list, idx),
          });
        };

        codeList.forEach((post, idx) =>
          handleList(codeList, postPage, post, idx)
        );

        generalList.forEach((post, idx) =>
          handleList(generalList, postPage, post, idx)
        );

        snippetList.forEach((snippet, idx) =>
          handleList(snippetList, snippetPage, snippet, idx)
        );

        const tagList = Array.from(tagSet);
        tagList.forEach((tag) => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: { tag },
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach((category) => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: { category },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

// snippets: allMdx(
//   filter: { fields: { sourceInstanceName: { eq: "snippets" } } }
//   sort: { fields: [frontmatter___date], order: DESC }
// ) {
//   edges {
//     node {
//       frontmatter {
//         lang
//         tags
//         title
//       }
//       fields {
//         slug
//       }
//     }
//   }
// }
