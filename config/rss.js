module.exports = {
  query: `
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          site_url: siteUrl
        }
      }
    }
  `,
  feeds: [
    {
      serialize: ({ query: { site, allMarkdownRemark } }) => {
        return allMarkdownRemark.edges.map((edge) => {
          return Object.assign({}, edge.node.frontmatter, {
            description: edge.node.excerpt,
            date: edge.node.frontmatter.date,
            url: site.siteMetadata.siteUrl + edge.node.fields.slug,
            guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
            custom_elements: [{ 'content:encoded': edge.node.html }],
          });
        });
      },
      query: `
        {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
          ) {
            edges {
              node {
                excerpt
                html
                fields { slug }
                frontmatter {
                  title
                  date
                }
              }
            }
          }
        }
      `,
      output: '/rss.xml',
      title: "JustinFormentin.com RSS Feed",
      // optional configuration to insert feed reference in pages:
      // if `string` is used, it will be used to create RegExp and then test if pathname of
      // current page satisfied this regular expression;
      // if not provided or `undefined`, all pages will have feed reference inserted
      match: '^/blog/|/code/|/general/',
      // optional configuration to specify external rss feed, such as feedburner
      // link: 'https://feeds.feedburner.com/gatsby/blog',
    },
  ],
};
