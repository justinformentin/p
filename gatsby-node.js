const path = require("path");
const _ = require("lodash");

const pathPrefixes = {
  code: "/code",
  general: "/general",
  projects: "/portfolio"
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const pathPrefix = pathPrefixes[fileNode.sourceInstanceName];
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.path)}`;
    }
    createNodeField({
      node,
      name: "sourceInstanceName",
      value: fileNode.sourceInstanceName
    });
    createNodeField({ node, name: "slug", value: `${pathPrefix}${slug}` });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.jsx");
    const projectPage = path.resolve("src/templates/project.jsx");
    const tagPage = path.resolve("src/templates/tag.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");
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
          projects: allMarkdownRemark(
            filter: { fields: { sourceInstanceName: { eq: "projects" } } }
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  chunk
                  title
                  cover {
                    childImageSharp {
                      resize(width: 600) {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();

        const codeList = result.data.code.edges;
        const generalList = result.data.general.edges;
        const projectsList = result.data.projects.edges;

        codeList.forEach(post => {
          if (post.node.frontmatter.tags) {
            post.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (post.node.frontmatter.category) {
            categorySet.add(post.node.frontmatter.category);
          }

          const filtered = codeList.filter(
            input => input.node.fields.slug !== post.node.fields.slug
          );
          const sample = _.sampleSize(filtered, 2);
          const left = sample[0].node;
          const right = sample[1].node;

          createPage({
            path: post.node.fields.slug,
            component: postPage,
            context: {
              slug: post.node.fields.slug,
              left,
              right
            }
          });
        });

        generalList.forEach(post => {
          if(post){
            if(post.node){
          if (post.node.frontmatter.tags) {
            post.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (post.node.frontmatter.category) {
            categorySet.add(post.node.frontmatter.category);
          }

          // const filtered = generalList.filter(
          //   input => input.node.fields.slug !== post.node.fields.slug
          // );
          // const sample = _.sampleSize(filtered, 2);
          // const left = sample[0].node;
          // const right = sample[1].node;

          createPage({
            path: post.node.fields.slug,
            component: postPage,
            context: {
              slug: post.node.fields.slug,
              // left,
              // right
            }
          });
        }
      }
        });

        projectsList.forEach(project => {
          const filtered = projectsList.filter(
            input => input.node.fields.slug !== project.node.fields.slug
          );
          const sample = _.sampleSize(filtered, 2);
          const left = sample[0].node;
          const right = sample[1].node;

          createPage({
            path: project.node.fields.slug,
            component: projectPage,
            context: {
              slug: project.node.fields.slug,
              left,
              right
            }
          });
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  });
};
