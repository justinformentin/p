---
title: "Guide to Building a Gatsby Site From the Ground Up"
path: "guide-to-building-a-gatsby-site"
cover: "./gatsby-header.jpg"
date: "2018-10-30"
chunk: "Learn how to build a site using Gatsby from empty folder to deployment."
kind: "Article"
category: "Gatsby"
tags:
    - React
    - Development
---
> This guide is for Gatsby Version 2.

##Table of Contents
1. [Installing and Setting Up Gatsby](#installing-and-setting-up-gatsby)

2. [Creating the Layout Page](#creating-the-layout-page)

3. [Using GraphiQL to View and Build Queries](#using-graphiql-to-view-and-build-queries)

4. [GraphQL Queries](#graphql-queries)

      a. [Page Query](#page-query)

      b. [Static Query](#static-query)

5. [Formatting Markdown Files](#formatting-markdown-files)

6. [Creating A List of Markdown Files](#creating-a-list-of-markdown-files)

7. [Filtering and Sorting Markdown Files](#filtering-and-sorting-markdown-files)

      a. [Sorting](#sorting)

      b. [Date Formatting](#date-formatting)

      c. [Filtering](#filtering)

8. [Creating Pages Programmatically](#creating-pages-programmatically)

9. [Creating Tags](#creating-tags)

10. [Simple Pagination](#simple-pagination)

11. [Using Images](#using-images)

      a. [JavaScript Import](#javascript-import)

      b. [Images Through Gatsby Plugins](#images-through-gatsby-plugins)

12. [Styling](#styling)

      a. [Emotion](#emotion)

      b. [ThemeProvider, injectGlobal, and passing prop](#themeprovider-injectglobal-and-passing-props)

      c. [Other Options - Styled JSX, Sass](#other-options---styled-jsx-sass)

      d. [Typography](#typography)

13. [SEO, Adding Manifest, Sitemap, Offline Support](#seo-adding-manifest-sitemap-offline-support)

      a. [SEO File](#seo-file)

14. [Cleaning Up](#cleaning-up)

15. [Deploying](#deploying)

16. [Conclusion](#conclusion)

## Introduction


[Gatsby](https://gatsbyjs.org) is *technically* a Static Site Generator (SSG) which allows you to build incredibly fast websites using React. I say technically because you aren't truly limited to static, client side rendered (CSR) sites. Gatsby is more of a hybrid, allowing you to use dynamic content, connect to a Content Management System (CMS), utilize server side rendering (SSR) and more. In this guide, we're going to focus on just the static site part. Also, Gatsby uses [GraphQL](https://graphql.org) which will be covered in this guide.

If you follow along you'll be able to go from an empty folder to a fully functioning Gatsby site, while understanding how it all works under the hood.

## Installing and Setting Up Gatsby

I recommend starting with an empty file and following along to get the most out of this guide. But, if you just want the completed project, it can be found in the [repository's master branch.](https://github.com/justinformentin/gatsby-v2-tutorial-starter)

Gatsby has an a huge amount of incredibly useful plugins. The plugins can be broken down into three main categories: transformer, functional, and source.

**Transformer plugins** take data that isn't usable in its current form, such as markdown or json, and transforms it into a format that can be queried against with GraphQL. We will be using `gatsby-transformer-remark` to transform Markdown files into HTML.

**Functional plugins** either implement functionality, such as manifest generation or offline support, or they extend Gatsby functionality, like adding Typescript support. One functional plugin we'll be using is `gatsby-plugin-catch-links`, which intercepts local links and replaces the link behavior with Gatsby's Link. This avoids having the browser refresh the page and as a result, allowing for page changes without reload.

**Source plugins** create `nodes` which is the center of Gatsby's data system, and transform data into a usable format. We'll be using `gatsby-source-filesystem` which loads files of off the disk allowing the transformer plugins to transform the data.

To start, install the dependencies with `npm i react react-dom gatsby gatsby-source-filesystem gatsby-transformer-remark gatsby-plugin-catch-links`.

Next create the `gatsby-config.js` file and enter the site metadata. Make sure the file is in the root of the project, not in /src.

```jsx{3}
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title:'Gatsby Tutorial Site',
    description: 'Welcome to your brand new Gatsby V2 Website.'
  },
}
```

## Creating the Layout Page

Let's create a layout component. It will include the features that we want rendered on all pages, such as the header, the footer, etc. Create the folder `layouts` and in it `index.jsx`. We need to pass the {children} so that whatever we put in our components gets rendered down the line.

```jsx{6}
// src/layouts/index.jsx
import React from 'react'

export default ({ children }) => (
  <div>
    <h3>Gatsby Tutorial</h3>
    {children}
  </div>
)
```

Now let's fill out the main page with a basic export.

```jsx
// src/pages/index.js
import React from 'react'

export default () => (
  <div>
    <h1>Gatsby Tutorial Site Home Page</h1>
    <p>This is the home page.</p>
  </div>
)
```

And finally we'll make an about page.

```jsx
//src/pages/about.jsx
import React from 'react'

export default () => (
  <div>
    <h1>About</h1>
    <p>This is the about page.</p>
  </div>
)
```

Here's a really cool feature of Gatsby. Routing is done using `@reach/router` under the hood. Keeping things simple, all we have to do is import `Link` from Gatsby and use the Link component with the desired path. Let's go into the Layout component and do that now.

```jsx
// layouts/index.jsx
import React from 'react'
import { Link } from 'gatsby'

export default ({ children }) => (
  <div>
    <Link to={'/'}>
      <h3>
        Gatsby Tutorial
      </h3>
    </Link>

    <Link to={'/about'}>
      About
    </Link>
    {children}
  </div>
)
```

## Using GraphiQL to View and Build Queries

Gatsby uses [GraphQL](https://graphql.org), which is a **Q**uerying **L**anguage that allows access data data through simple declarative expressions. One major benefit of GraphQL is that it eliminates a lot of bloat. It allows you to be specific and receive only the data you need. We can take a look at all the queries that are available by using a tool called GraphiQL. We can access it by starting the dev server with `gatsby develop`, and then opening [localhost:8000/___graphql](localhost:8000/___graphql).

Now that we have GraphiQL open in the browser, open up the Documentation Explorer and look through the schema and see what queries we can make. Click on the `QueryType` and we see a big list of eveything available. Since we've already entered the site metadata, let's see how to query it. Look at the `site` query and we see that the first key that's listed is `siteMetadata`. If we enter that query and click run:

```graphql
{
  site {
    siteMetadata
  }
}
```

We'll see the output:

```graphql
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Gatsby Tutorial Site",
        "description": "Welcome to your brand new Gatsby V2 Website.",
      }
    }
  }
}
```

We see `title` and `description`. These will update if we make changes to the `gatsby-config.js` file. Let's try that. We'll add `author: "Justin"` under the "description." Let's save it, restart the dev server, and reload the GraphiQL explorer. And author is now a field.

## GraphQL Query

Sticking to React's paradigm of **reusable components**, we have a chance to reuse a bit of data. Notice how in both the index and the about page have similar titles? When building sites, there will be plenty of instances where being able to reuse data is ideal, avoiding having to type the same thing over and over again.

Also, what if we wanted to change the title, or any other data in the future? We'd have to go through every page and manually change it. The more complex your site becomes, the more "going back and changing stuff" becomes a burden. Let's make this as pain free as possible by using GraphQL. We'll have our title come from one single location, the `gatsby-config.js` we've already written.

To query it, we have two options as of Gatsby v2, `page query` and `StaticQuery`. StaticQuery can be used in any page or component, but variables can't be passed to them, hence the "static" name. Page queries on the other hand, can only be used in pages, but you're allowed to pass query variables to them.

### Page Query

First we'll use the page query. Since we've already looked at the GraphiQL explorer, we know what our query should look like.

```jsx
// src/pages/about.jsx
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts'

export default ({ data }) => (
  <Layout>
    <h1>{data.site.siteMetadata.title} About Page</h1>
    <p>This is the about page.</p>
  </Layout>
)

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

And if we check the about page, the title is right there.

### Static Query

Let's test out StaticQuery now. Since it can be used on non-page components, let's add it to the Layout. First we need to import StaticQuery and grapqhl, and return the <StaticQuery> component.

It accepts two props, `query` and `render`. The query prop takes a
a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), which allow embedded expressions. The render prop takes a function with `data` as a single argument. The `data` is the `query` results.

```jsx
// src/layouts/index.jsx
import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Link to={'/'}>
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <Link to={'/about'}>
          About
        </Link>
        {children}
      </div>
    )}
  />
)
```

## Formatting Markdown Files

Now we're going to go a little further in utilizing GraphQL and make some posts. We can keep our markdown files in a separate directory outside of /src. It makes it easier to look at and find files, especially when we start adding photos. Let's `mkdir content/posts` and then create a different folder for individual posts. With those made, make an index.md in each folder. Inside each index.md file, we'll create our post. The important part to take note of is the set of three dashes. That is the "frontmatter", and the contents of the block will be the data that we can pass into our pages and templates later on.

```markdown
---
path: "/post-one"
date: "2018-10-15"
title: "My First Post"
tags: ['gatsby', 'other']
---
This is my first post using Gatbsy.
```

Now go back to the `gatsy-config.js` file and add add the plugins we installed before.

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title:'Gatsby Tutorial Site',
    description: 'Welcome to your brand new Gatsby V2 Website.'
  },
  plugins: [
  'gatsby-plugin-catch-links',
  'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`
      }
    }
  ]
}
```

Make sure the "path:" is set to where your markdown files are located.

Let's go back to our GraphiQL explorer and see the newly added `allMarkdownRemark`. Click on `MarkdownRemarkConnection` and we'll see all of the fields. We see `edges`, which are the filepaths. Click on the `[MarkdownRemarkEdge]` next to the edge field and we'll see `node` up at the top, which is each of our markdown files we created. Inside of node we see that frontmatter is a field, which is what encompasses what is in our markdown files.

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter
      }
    }
  }
}
```

Run the query and see all that data that `frontmatter` has. We can get more specific and query a single field, such as the title, and get only that result. So we just made use of the transformer plugin, and we saw it "transform" the content onto our page. There are around 500 plugins at the time of writing this and we'll be using more to do various things later on.

## Creating A List of Markdown Files

Now let's make a list of our markdown files. We'll be using GraphQL to query our content and render it on a page. First, let's go back to our index page and import graphql and then write out the query. What we enter into our query will be exactly what data gets passing into the component.

To pass the data into the component, we'll pass `data` and destructure `edges` as data.allMarkdownRemark, map over it to get the post fields, and then add each field that we entered in our query.

Let's keep the id, and with it we'll specify the key. Each child component as well as each element inside the child should have keys. React uses the keys to determine the identity of the rendered elements. This is important for minimizing DOM manipulation, leading to better performance. To learn more, start at the [Official React Docs about lists and keys](https://reactjs.org/docs/lists-and-keys.html) and go from there.

After that, just fill out the information that we queried. Side note: the field `excerpt` lives on the `node`, and takes two arguments - `pruneLength`, an integer and `truncate`, a boolean. We'll prune it and play with the length until it feels right.

```jsx
// src/pages/index.js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts'

export default ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
        <h1>Gatsby Tutorial Site Home Page</h1>
        {edges.map(({ node }) => (
          <div key={node.id}>
            <h3>{node.frontmatter.title}{" "}</h3>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </div>
        ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt(pruneLength:100)
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
```

The list of our posts should now be on the home page.

## Filtering and Sorting Markdown Files

Now that we have a list of our posts, let's organize them.

### Sorting

Let's first make sure that the newest post is always on top. Go back to our GraphiQL explorer and look at allMarkdownRemark, we'll see that it can take some arguments. Click on `sort`, and we see both `fields` and `order`. Checking `order`, we see ASC and DESC for ascending and descending. Clicking on `fields` we see a whole list of options. It makes sense to sort by `frontmatter___date` so let's add that to our query.

### Date Formatting

Go to back to our `allMarkdownRemark`, click on `frontmatter`, and we'll see that `date` has some options as well. We'll format it using `formatString`.

```jsx
// src/pages/index.js
...
export const query = graphql`
  query {
    allMarkdownRemark (
    sort: {order: DESC, fields: [frontmatter___date]}
      ) {
      edges {
        node {
          id
          frontmatter {
            title
            excerpt
            date(formatString: "MM.DD.YYYY")
          }
        }
      }
    }
  }
`
```

### Filtering

To show only certain posts depending on certain criteria, we can use `filter`. A common filter to display posts is by saying if a post is a draft or not. So let's go into our markdown files and add the field `draft`.

```md
---
title: "My First Post"
path: "/post-one"
date: "2018-10-15"
draft: false
tags: ['gatsby', 'other']
---
This is my first post using Gatbsy.
```

We'll do the same in the other posts, but make the second post true and the third post false. Save and restart the server, and let's go back to the GraphiQL browser and check out `frontmatter` and we see `draft` has been added. Let's make a query to see what gets returned. We'll add `filter` onto its own line, and then say if the `draft` field from `frontmatter` is false, show the posts on the page.

```graphql
{
  allMarkdownRemark (
    filter: { frontmatter: { draft: { eq: false} } }
  ) {
    edges {
      node {
        frontmatter
      }
    }
  }
}
```

Run the query and we see only post one and three were returned, the two markdown files with `draft: false`. Let's add the filter into our our index file so the list only shows those two posts instead of all three.

```jsx
//src/pages/index.js
...
export const query = graphql`
  query {
    allMarkdownRemark (
    filter: { frontmatter: { draft: { eq: false} } }
    sort: {order: DESC, fields: [frontmatter___date]}
      ) {
...
```

## Creating Pages Programmatically

Now we want our list of posts to link to the actual posts. Let's try that by wrapping the title of our posts on the home page with `Link`. Import `Link` from gastby, and then add the frontmatter.path as the Link path.

```jsx
// src/pages/index.js
...
            <Link to={node.frontmatter.path}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
...
```

And now that we added , we need to add `path` to our query as well.

```jsx
// src/pages/index.js
...
          frontmatter {
            path
            title
            excerpt
            date(formatString: "MM.DD.YYYY")
          }
...
```

And if we try it, we'll see it just brings us to the 404 page. That's because we haven't created the post pages yet. Gatsby will automatically create a page from any JS or JSX file inside the `/src/pages` directory, but if we want to create pages from each of our `/content/post` markdown files, a few things need to be done first. Create `gatsby-node.js` in the root, create the directory `/src/templates` and then create `posts.jsx` in the templates folder.

First let's just make a super basic component in `post.jsx`.

```jsx
// src/templates/post.jsx
import React from 'react'
import { graphql } from 'gatsby'

const Post = (props) => {
  return (
    <div>
      Post
    </div>
  )
}

export default Post
```

Next, in `gatsby-node.js` we're going to make use of `createPages`, one of Gatsby's APIs. We need to create the createPages export function, and then destructure actions, which is where `createPages` is located, and the function then returns a new promise since file creation is async by nature.

To create the page, it needs to be able to access the post template we just made. Create a variable and use `path.resolve` with the path to the template. Then call our graphql query to resolve the promise starting with `allMarkdownRemark` and including the file `path`.

Now let's pass the result into a function with a then, write a quick reject, and the result will be `result.data.allMarkdownRemark.edges`, an object that matches the query above. Since edges are the path to our files, we'll add a forEach on the edges to extract our file's path from node.frontmatter.

Let's destructure that and add it to the posts variable. Destructuring the `node`, we'll set the path as `node.frontmatter.path`, and then call the `createPage` action. The first parameter should be the path, the second parameter is the component we want to render, which is the post template, and the last object is the context which will be passed into our post template as a prop.

We want the post template to have the file path, so we'll name it pathSlug because path is reserved. As a side note, `context` is optional as it has defaults built in.

To summarize what's going on, we made a query that finds our files and gets the path from frontmatter. We cycle through them and call createPage which will use our post template to create a new page for each of our markdown files.

```js
// gatsby-node.js
const path = require('path')

exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.jsx')

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(({node}) => {
          const path = node.frontmatter.path

          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path
            }
          })
        })
      })
    )
  })
})
```

After restarting the server, let's go back to our post template and add a `console.log` to see if our data made it through. In the dev tools, look at the console and all of the correct data for our post should be there.

We want to render all the content onto the page, so let's head back over to the post template and write a graphql query. To get the path, write a slug variable with the `$pathSlug` that we added previously, and then make it a required String. Since we want only one markdown file, use markdownRemark instead of allMarkdownRemark.

Now we need to write a GraphQL query to search markdownRemark for the markdown files. Testing it out on the GraphiQL explorer, we can see what our options are.

So let's see if we can pull in the data properly. The data gets passed as a prop from the query, so we'll try `<h1>{props.data.markdownRemark.frontmatter.title}</h1>` and save it.

Now that we've confirmed it works properly, let's break up the props. Change the `props` to data and since we'll be using `data.markdownRemark` for all of our variables, we'll set `const post = data.markdownRemark.` Set the title as a variable `const title = post.frontmatter.title` and the same for `date`. To render the HTML, we're going to make use of React's `dangerouslySetInnerHTML` API.

To do so, we need to define html. If we look in GraphiQL we'll see that html isn't in frontmatter, but just in markdownRemark. So we'll define the html variable as `post.html`, and then pass in __html as an object with a value of html.

```jsx
// src/templates/post.jsx
import { graphql } from 'gatsby'
import Layout from '../layouts'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const title = post.frontmatter.title
  const date = post.frontmatter.date
  const html = post.html

  return (
    <Layout>
        <h1>{title}</h1>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`
export default Post
```

## Creating Tags

Now let's add tags to the site so we can browse posts by the tag. First, make the `tags.jsx` page, and the `tag.jsx` template. We'll make it a very simple component that has some text just to test that it works for now.

```jsx
// src/pages/tags.jsx & src/templates/tag.jsx
import React from 'react'

const Tags = () => {
  return (
    <div>
      Tags Page Here
    </div>
  )
}

export default Tags
```

First let's think about what the tag actually is and how it's working within our project. At a basic level, it's not a page or a post or a template really. We're just creating all of that out of a single word or line of text inside our markdown files. They'll change when we add new posts with new tags, and if the same tag is used for mutliple posts, we don't want duplicates of the tag in a tag list.

Moving back to `gatsby-node.js`, we're going to want a variable for our template and page files, so we'll do the same path.resolve(/path/to/template) we did earlier, and add it under the existing `postTemplate` within the Promise.

Next, instead of creating a single entity, we'll create an object that will dynamically create a key for each tag which will then hold an array for each post that contains that specific tag. So we'll do `posts.forEach` to iterate over the array, and then destructure `node` and write an if statement to check if there is *not* a post with the tag as a key. We'll then set the `\[tag]` as an empty array and push the node. So now this object has each tag being represented by an array of nodes.

To create a list of all the tags, set tags equal to `Object.keys` and then add a `createPage` like we did earlier with our posts. We'll make the path be /tags, the component is tagPosts and to get a sorted list of tags, add `tags.sort()` to the context.

```js
// gatsby-node.js
const path = require('path')

exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.jsx')
    const tagPage = path.resolve('src/pages/tags.jsx');
    const tagPosts = path.resolve('src/templates/tag.jsx');

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges;

        // create tags page
        const postsByTag = {};

        posts.forEach(({ node }) => {
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
              if (!postsByTag[tag]) {
                postsByTag[tag] = [];
              }
              postsByTag[tag].push(node);
            });
          }
        });

        const tags = Object.keys(postsByTag);

        createPage({
          path: '/tags',
          component: tagPage,
          context: {
            tags: tags.sort(),
          },
        });

        //create posts
        posts.forEach(({node}) => {
          const path = node.frontmatter.path

          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path
            }
          })
        })
      })
    )
  })
})
```

Now we want to actually pull in our tags on the tags page. Go to `tags.jsx` and let's add `pageContext` as props. To see what data is being passed, we'll add a `console.log(pageContext)`. `pageContext` is the data getting passed from `gatbsy-node.js`, which in this case, is the `tags` we added. Now checking the console we see the `tags: Array` with all of our tags.

```jsx
// src/pages/tags.jsx
import React from 'react'

const Tags = ({ pageContext }) => {
console.log(pageContext)
  return (
    <div>
      Tags Page Here
    </div>
  )
}

export default Tags
```

Now that the tags page is working we need to edit our tag template. This will be the page that loads when the individual tags are clicked and they will list the posts that contain that specific tag. First create the actual /tags/${tagName} pages in `gatsby-node.js`. Next add a `tag.forEach` to iterate each tag name. Then we need to use our list of nodes we made previously as `[tagName]`. Now just call another createPage with the path being /tag/${tagName}, the component is the tagPosts, and then the context the posts and tagName.

```jsx
// gatsby-node.js
...
        //create tags
        tags.forEach(tagName => {
          const posts = postsByTag[tagName];

          createPage({
            path: `/tags/${tagName}`,
            component: tagPosts,
            context: {
              posts,
              tagName,
            },
          });
        });
...
```

Now let's go into our tag.jsx template. Let's first check we did this correctly by console logging the pageContext again. Go to a tag page and see the correct tag in the posts array in our console. Then, destructure `pageContext` into the `posts` and `tagName`. Next, add a title to show what the page is about with $ {tagName}. Now add a `<ul>` which will map over the posts to return an `<li>`. As always, we should add a key to any list, so we'll add an index and set the key to the index. Then add a `<Link>` to `post.frontmatter.path` with the `post.frontmatter.title`. Save it, and we'll see a list of tags that link to individual tags.

```jsx
// src/templates/tag.jsx
import React from 'react'
import { Link } from 'gatsby'

const Tag = ({pageContext}) => {
  const { posts, tagName } = pageContext
  return (
    <div>
      <div>
        Posts about {`${tagName}`}
      </div>
      <div>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Tag
```

We'll now do something similar to our tag page. This time though, we'll only be destructuring tags from pageContext. Add a ul which will map over the tags, add a key again, and then add a `<Link>` to `${/tags/${tagName}}`.

```jsx
// src/pages/tags.jsx
import React from 'react'
import { Link } from 'gatsby'

const Tags = ({pageContext}) => {
  console.log(pageContext)
  const { tags } = pageContext
  return (
    <div>
      <ul>
        {tags.map((tagName, index) => {
          return (
            <li key={index}>
              <Link to={`/tags/${tagName}`}>
                {tagName}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags
```

Since we'll be using this tag list in multiple places, let's use this opportunity to break out the code and make a separate component that will be a block of tags that will be displayed on each post. Let's make an `src/component` folder and make `TagsBlock.jsx`. Import Link from gatsby and then pass in list. We're going to map over list with a Link that goes to `/tags/${tag}`. And that's it.

```jsx
// src/components/TagsBlock.jsx
import React from 'react'
import { Link } from 'gatsby'

const TagsBlock = ({ list }) => {
  return (
    <div>
      {list.map(tag =>
        <Link key={tag} to={`/tags/${tag}`}>
          {tag}
        </Link>
      )}
    </div>
  )
}

export default TagsBlock
```

Back on the post template, we'll first import TagsBlock and then stick it under the title. On the list prop, pass the tags from `{post.frontmatter.tags}` *or* an empty array in case there are no tags.

```jsx
// src/templates/post.jsx
        <TagsBlock list={post.frontmatter.tags || []} />
```

Let's see what happens if we don't add the `|| []`. In the last post markdown file, let's delete the entire tags field, and save. In the second to last post, let's just delete the tags but leave an empty array. If we load the second to last post, it's fine, there just aren't any tags. But if we go to the last post that doesn't even have the tags field, the page doesn't load. There are plenty of other ways to achieve this without needing a `|| []` at all, but that'll do for right now.

I wanted to point this out because this is something to watch out for when developing your Gatsby site. If a page loads but neither content nor errors are showing up, but when checking the console, an error *does* get listed, and it says something weird like "Cannot read property 'map' of null", go back and check all of your queries and data being passed. Sometimes just forgetting a single word will do it.

Now that we have a TagsBlock component, let's go back to our `tags.jsx`, swap it in, and pass `{tags}` as the `list` prop.

```jsx
// src/pages/tags.jsx
import React from 'react'
import TagsBlock from '../components/TagsBlock'

const Tags = ({ pageContext }) => {
  console.log(pageContext)
  const { tags } = pageContext
  return (
    <div>
      <TagsBlock list={tags} />
    </div>
  )
}

export default Tags
```

So much cleaner.

## Simple Pagination

Now that the posts are up and running, we want to be able to navigate through them without having to go back to the home page. To do this, we'll add previous and next buttons. Go back to the `gatsby-node.js`, and inside the forEach, add an index so we know where we're located in the list as a whole.

For `prev`, we can start by saying if our index is zero, then we won't need previous because there isn't a post to move backwards to. Otherwise, we'll get the post[index - 1].node which is the post that comes before the current post. For `next`, it'll be the same thing but reversed. We'll say `(posts.length - 1)`, so if it's the last post, there is no next. Otherwise we'll get the post[index + 1].node, which is the post after the current post.

```jsx
// gatsby-node.js
...
  //create posts
  posts.forEach(({ node }, index) => {
    const path = node.frontmatter.path
    const prev = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path,
      component: postTemplate,
      context: {
        pathSlug: path,
        prev,
        next,
      }
    });
  });
...
```

Now let's see if it worked. We'll go to our post.jsx and add the `pageContext` key, and then console.log(pageContext). Let's load our first post and look in the console. We see `next: null` and data for `previous`. This is obviously backwards because there shouldn't be data for previous on the first post. To fix this we just need to use `sort` like we did a little earlier. Go back to `gatsby-node.js` and add the sort keyword, which takes an object of order by ascending, and by the field frontmatter___date.

```jsx
// gatsby-node.js
...
          query {
            allMarkdownRemark (
              sort: {order: ASC, fields: [frontmatter___date]}
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                    date
                  }
                }
              }
            }
          }
...
```

Reload the server and go back to our first post and check the console. `Next` has data and `prev` is null, and on the last post `next` is null and `prev` has data, so it works!

Now to add the Next and Previous links to the posts. Go back to our `post.jsx` and import Link from gatsby, destructure prev and next from our `pageContext`. We'll start with `{next &&`, and add a <Link> component to `{next.frontmatter.path}`. The double ampersand checks the truthiness of the value and so if `next` is true, it will render this Link. And we'll just do the same thing again but replace next with prev, and wrap each one in a div so they're not stuck right next to each other.

```jsx
// src/templates/post.jsx
import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../layouts'

const Post = ({ data, pageContext }) => {

 const {next, prev} = pageContext
 const post = data.markdownRemark
 const title = post.frontmatter.title
 const date = post.frontmatter.date
 const html = post.html
 return (
    <Layout>
        <h1>{title}</h1>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      <div>
      {next &&
        <Link to={next.frontmatter.path}>
          Next Post
        </Link>
      }
      </div>
      <div>
      {prev &&
        <Link to={prev.frontmatter.path}>
          Previous Post
        </Link>
      }
      </div>
    </Layout>
  )
}
```

## Using Images

The site works, but it's not much of a looker. We'll get into styling in the next section, but right now let's just bring some images in to make the site more alive. There are a few ways of doing this but in this tutorial we're going to be focusing on two ways in particular- the JavaScript import, and using Gatsby Plugins.

### JavaScript Import

The first way to add an image to our Gatsby site is to import it like you would in any JavaScript file. Let's add a logo to the site. First make an static folder to hold the logo file, and then add logo into the folder.

Now, since this is a logo, we want it to show on all pages. Go to the Layout component and write the import statement, and just call it logo for simplicity. Add the `img` and pull in the `logo` variable we just imported as <img src={logo} />

```jsx
// src/layouts/index.jsx
import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import logo from '../static/logo/gatsby.svg'
...
    render={data => (
      <div>
        <img src={logo} alt='Gatsby Logo' />
        <Link to={`/`}>
...
```

A really cool thig about Gatsby is all the settings that come built-in. Relating to images, Gatbsy's default webpack settings are focused on performance. When Gatbsy bundles *any* file that is less than 10KB, it will return a data uri which will result in fewer browser requests which increases the performance of the app. If it's over 10KB, it'll be bundled into the static folder. To see a quick example of this, import a large jpg file into Layout, and then console.log both the jpg and our previously imported icon.

```jsx
// src/layouts/index.jsx
...
import logo from '../static/logo/gatsby.svg'
import jpg from '../static/logo/gatsby.jpg'

console.log(jpg)
console.log(logo)
...
```

In our console, we can see that the jpg is in the static folder, and the svg has been turned into a data uri.

### Images Through Gatsby Plugins

One thing our posts are lacking is an image. As previously mentioned, we have some gatsby plugins available to us to help make everything super smooth and performant. First, `npm i gatsby-transformer-sharp gatsby-plugin-sharp gatsby-remark-images gatsby-image`.

Head over to `gatsby-config.js` so we can make use of our new plugins. Add gatsby-transformer-sharp, resolve gatsby-transmforer-remark, and then resolve gatbsy-remark-images as a plugin of the transformer-remark. We have some options for remark-images, so let's set the `max width`, `quality`, and then add a link to the original image. Underneath all that we'll load gatsby-plugin-sharp.

```js
// gatsby-config.js
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`
      },
    },
 'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              quality: 90,
              linkImagesToOriginal: true,
            }
          }
        ]
      }
    },
 'gatsby-plugin-sharp'
  ]
}
```

Now let's add the images to our post folders, and then add the field `cover`, as in cover photo, to our frontmatter, with the path to our images.

```md
---
path: "/post-two"
cover: "./network.jpg"
...
```

Go to the `post.jsx` template file and connect all of it together through a query.  First, import Img from `gatsby-image`, add cover, childImageSharp, fluid, and then some arguments.

```jsx
// src/templates/post.jsx
...
 return (
    <Layout>
        <Img fluid={post.frontmatter.cover.childImageSharp.fluid} />
        <h1>{title}</h1>

...

    markdownRemark(frontmatter: { path: {eq: $pathSlug} }) {
      html
      frontmatter {
        date
        title
        tags
        slug
        cover {
          childImageSharp {
          fluid(maxWidth: 1920, quality: 90, duotone: { highlight: "#386eee", shadow: "#2323be", opacity: 40 }) {
          ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1200, quality: 90) {
              src
            }
          }
        }
...
```

Now we need to go to index page and do something similar.

```jsx
// src/pages/index.jsx
...
          frontmatter {
            title
            path
            excerpt
            date(formatString: "MM.DD.YYYY")
            cover {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 90, traceSVG: { color: "#2B2B2F" }) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
...
```

Gatsby is designed to build incredibly fast sites, so why not utilize every tool available? Sure just importing a regular old <img> works, but using plugins makes everything more performant. First, `gatsby-image` does a whole list of things. Taken from the docs, it:

-Loads the optimal size of image for each device size and screen resolution
-Holds the image position while loading so your page doesn’t jump around as images load
-Uses the "blur-up" effect i.e. it loads a tiny version of the image to show while the full image is loading
-Alternatively provides a "traced placeholder" SVG of the image
-Lazy loads images, which reduces bandwidth and speeds the initial load time
-Uses WebP images, if browser supports the format

`Gatsby-transformer-sharp` creates the `ImageSharp` node. `Gatsby-remark-images` does the processing in markdown so pictures can be used in production builds, and it does a few other things similar to `gatsby-image` like adding an elastic container, generates multiple sizes, and uses 'blur-up'. And finally, `gatsby-plugin-sharp` is a helper plugin used by the other image plugins that also uses pngquant to compress images.

If you're not already sold, I don't know what else to tell you. If you've ever had to deal with resizing images, holding images, importing, compressing, using placeholders, using lazy loaders, and considering other browsers, you understand how amazing it is to control all of that with a few lines in your query.

## Styling

Let's make this site look like *something* because it's getting painful to keep staring at.

### Emotion

We'll be using Emotion here, but Styled Components could be used as well because of how similar they are. In fact, they're so similar, we could actually replace all `react-emotion` with `styled-components` in this project, and all we'd need to do to get it to work is change the name of the global injection. There are of course, more nuanced differences between the two, so read the docs to decide which is best for you.

Let's `npm i emotion react-emotion emotion-theming, gatsby-plugin-emotion`, and then add `gatsby-plugin-emotion` to the plugins in `gatsby-config.js`.

### ThemeProvider, injectGlobal, and passing props

We're going to be passing some theme props with each example so let's start by making a config folder outside of the `src` and make a `theme.js` file. Next, go to the Layout component and set it up so we can pass the theme config through. First, break apart the layout a little to simplify it. We'll use Emotion's `ThemeProvider`. This is a wrapper component that will provide a theme to every component down the line in the render tree through the context API. Import the theme, and then pass the children through. Let's also make use of injectGlobal, which is a way to have a global style across the whole project. We'll import { injectGlobal } from emotion and then just write the css.

```jsx
// src/layouts/index.jsx
import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { injectGlobal } from 'react-emotion'
import theme from '../../config/theme'

injectGlobal`
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {children}
    </Fragment>
  </ThemeProvider>
)

export default Layout
```

So now, whatever we put inside the ThemeProvider tag will have the global style, as well as access to the props from the `theme.js` file. In our other components or pages, we just need to import the Layout component and then wrap everything with `<Layout></Layout>`. Going further, if you find yourself using the same style block for multiple components, you can break the styling off completely and make a single file like this:

```jsx
import styled from 'react-emotion'

const Foo = styled.div`
  padding: 1rem 2rem;
  color: ${props => props.theme.colors.black};
`

export default Foo
```

And then reuse that file by importing it in multiple different components, saving a lot of code. First let's take what we deleted from the Layout and turn it into a NavBar component. And we'll do a few very cool things with emotion to style this. First, let's differentiate the menu links from the Logo that's also a link back to the homepage. We'll make a variable and call it "StyledLink". But since we're already importing and using Gatsby's Link, how are we going to style it? We'll decorate the { Link } with the StyledLink variable.

```jsx
// src/components/NavBar.jsx
import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'react-emotion'
import Headroom from 'react-headroom'
import logo from '../static/logo/header-logo.png'

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-weight:500;
  font-size:1.25rem;
  align-items: center;
`

const NavBar = () => (
  <Fragment>
    <StyledLink to="/">
      <img src={logo} alt='Gatsby Logo' />
    </StyledLink>
    <Nav>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
    </Nav>
  </Fragment>
)

export default NavBar

```

Let's make this even better. Instead of having to write out every single color, shadow, padding, alignment, whatever, we can just pass theme props to the styled variables. Go to the currently empty `theme.js` file and fill it out a little bit.

```js
// config/theme.js
const colors = {
  black: {
    base: '#333438',
    light: '#4b4e57',
    lighter: '#696d77',
    blue: '#2e3246',
  }
}
const transition = {
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  duration: '0.4s',
}
const theme = {
  colors,
  transition,
}

export default theme
```

And now back in the nav, we can pass the theme styles as props. We can use those same props anywhere in our project, as long as it's somewhere down the tree of our Layout component with the ThemeProvider.

```jsx
// src/components/NavBar.jsx
const Nav = styled.nav`
...
  align-items: center;
  a {
    color: ${props => props.theme.colors.black.base};
    margin-left: 2rem;
    transition: all ${props => props.theme.transitions};
    &:hover {
      color: ${props => props.theme.colors.black.lighter};
    }
  }
`
```

### Other Options - Styled JSX, Sass

There are other options for styling, of course. Setting up Sass is a breeze when using `gatsby-plugin-sass`, there are other plugins related to postcss, and another interesting option is `styled-jsx`. Styled-JSX was developed by Zeit, the people that brough us Next.js. It's actually gotten very powerful as of the last few updates, and it seems very similar to emotion or styled components in functionality, such as passing props, server or client rendering, etc. Though, all the styling is done within `<style>` tags inside your component like:

```jsx
export default () => (
  <div>
    <style jsx>{`
      h3 {
        color: black;
      }
    `}
    </style>
    <h3>Good morning</h3>
  </div>
)
```
### Typography

Let's also add some fonts. We're going to use gatbsy typography plugin, and [typefaces](https://github.com/KyleAMathews/typefaces), npm packages for single fonts. The idea is that self-hosted typefaces are much faster than having to load a typeface from something like Google Fonts. It also works offline as well. We'll use Open Sans and Candal here, but there are over 800 fonts to choose from. We'll `npm i typeface-open-sans typeface-candal gatsby-plugin-typography` and then create a `typography.js` file in the config folder.

In `typography.js` add the base font size, line height, and header weight. For the header and body fonts, we'll use system fonts. System fonts improve user experience and performance because there's a fallback for every system- BlinkMacSystemFont is for iOS, Segoe UI is Windows, Roboto is Android. We'll also add in the Open Sans and Candela that we installed.

```js
// config/typography.js
import Typography from 'typography';

const typography = new Typography({
  title: 'GatsbyTutorial',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  headerWeight: 700,
  headerFontFamily: [
 'Candal'
 '-apple-system',
 'BlinkMacSystemFont',
 'Segoe UI',
 'Roboto',
 'Helvetica',
 'Arial',
 'sans-serif',
  ],
  bodyFontFamily: [
 'Open Sans',
 '-apple-system',
 'BlinkMacSystemFont',
 'Segoe UI',
 'Roboto',
 'Helvetica',
 'Arial',
 'sans-serif',
  ],
});

export default typography;
```

Also add the fonts to `theme.js`.

```js
// config/theme.js
const theme = {
  colors,
  transistion,
  fontFamily: {
    body: `Open Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
    heading: `Candal, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  }
}
export default theme
```

And then import them in the layout file:

```jsx
// src/layouts/index.jsx
import 'typeface-open-sans'
import 'typeface-candal'
```

Then add the typography plugin to `gatsby-config.js`.

```js
// gatsby-config.js
...
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'config/typography.js',
      },
    },
...
```

## SEO, Adding Manifest, Sitemap, Offline Support

Now let's get all our Google Lightouse scores maxed out at 100.  We need to add a manifest for Progressive Web App support, offline support, a sitemap for crawlers, React Helmet and an SEO component to give the site SEO. Let's `npm i react-helmet gatsby-plugin-react-helmet gatsby-plugin-manifest, gatsby-plugin-sitemap, gatsby-plugin-offline`.

Create a `site.js` file in the config folder, and this will hold all the configurations for the SEO component and the manifest.

```jsx
// config/site.js
module.exports = {
  pathPrefix: '/',
  title: 'Gatsby Tutorial Starter', // Site Title
  titleAlt: 'Gatsby Tutorial Starter', // Title for JSONLD
  description: 'A Gatsby V2 Starter Template Built with a Step By Step Guide',
  url: 'https://gatsby-tutorial-starter.netlify.com', // Site domain without trailing slash
  siteURL: 'https://gatsby-tutorial-starter.netlify.com/', // url + pathPrefix
  siteLanguage: 'en', // Language Tag on <html> element
  logo: 'src/static/logo/logo.png',
  banner: 'src/static/logo/banner.png',
  favicon: 'src/static/logo/favicon.png', // Manifest favicon generation
  shortName: 'GatsbyTut', // Shortname for manifest, must be shorter than 12 characters
  author: 'Justin', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
  twitter: '@justinformentin', // Twitter Username
};
```

Open `gatsby-config.js` and import the config file. We'll delete the old `siteMetadata` and replace it. We're going to use the ES6 `spread operator` to grab the whole list from the config file.

```jsx
// gatsby-config.js
const config = require('./config/site');

module.exports = {
  siteMetadata: {
 ...config
  },
...
```

At the bottom of the file, we'll load the sitemap plugin first, then the manifest plugin, and we'll load what we just imported from the site.js file. Then at the very end, add the offline plugin. It's important to have the manifest before the offline plugin so it can cache the manifest file. This plugin also takes icons and generates different sizes for different devices. The reason to use a manifest is so your site can behave similar to native apps on mobile devices.

```jsx
// gatsby-config.js
...
 'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
 'gatsby-plugin-offline'
  ]
}
```

### SEO File

Now we'll make an `SEO.jsx` component that can be imported in other files, such as our templates. We'll be passing the props from those pages into `SEO.jsx`, which will hold the basic data from our `site.js` config as props and we'll later use aliases and fallbacks for the other queries not stated in the props.

We'll use `propTypes` because we want to be certain we're getting all the correct data, so `npm i prop-types` now. We can use `defaultProps` to ensure that the `siteMetadata` from our `site.js` file gets used in case some property isn't explicitly defined.

We'll make a StaticQuery that has all the site's metadata in it. Then take the data from the query and create an object that will check if the props were used. If they weren't, it will fall back to defaults.


```jsx
// src/components/SEO.jsx
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const SEO = ({ title, desc, banner, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        buildTime,
        siteMetadata: {
          defaultTitle,
          titleAlt,
          shortName,
          author,
          siteLanguage,
          logo,
          siteUrl,
          pathPrefix,
          defaultDescription,
          defaultBanner,
          twitter,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: defaultDescription || desc,
        image: `${siteUrl}${banner || defaultBanner}`,
        url: `${siteUrl}${pathname || '/'}`,
      };
    }}
  />
);

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false,
};

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        titleAlt
        shortName
        author
        siteLanguage
        logo
        siteUrl: url
        pathPrefix
        defaultDescription: description
        defaultBanner: banner
        twitter
      }
    }
  }
`;
```

Now we'll be adding the schema JSON-LD so we can get those sweet google rich snippets. It's basically taking unstructured data from your website or app and structuring that data in a way that search engines can easily digest. So we'll take our site config and our site data, and pass the strings into objects to be structured automatically. To read more about it, visit[schema.org](https://schema.org/) and [Moz's guide](https://moz.com/blog/json-ld-for-beginners). As a side note, JSON-LD is actually a spec that is used for a lot more than SEO, and you can learn more on [json-ld.org](https://json-ld.org/learn.html) and also try out the [json-ld.org playground](https://json-ld.org/playground/).

```jsx
// src/components/SEO.jsx
...
     const seo = {
        title: title || defaultTitle,
        description: defaultDescription || desc,
        image: `${siteUrl}${banner || defaultBanner}`,
        url: `${siteUrl}${pathname || '/'}`,
      };
      const realPrefix = pathPrefix === '/' ? '' : pathPrefix;
      let schemaOrgJSONLD = [
        {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          '@id': siteUrl,
          url: siteUrl,
          name: defaultTitle,
          alternateName: titleAlt || '',
        },
      ];
      if (article) {
        schemaOrgJSONLD = [
          {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            '@id': seo.url,
            url: seo.url,
            name: title,
            alternateName: titleAlt || '',
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: seo.image,
            },
            description: seo.description,
            datePublished: buildTime,
            dateModified: buildTime,
            author: {
              '@type': 'Person',
              name: author,
            },
            publisher: {
              '@type': 'Organization',
              name: author,
              logo: {
                '@type': 'ImageObject',
                url: siteUrl + realPrefix + logo,
              },
            },
            isPartOf: siteUrl,
            mainEntityOfPage: {
              '@type': 'WebSite',
              '@id': siteUrl,
            },
          },
        ];
      }
    }}
  />
);
...
```

Now to add `React Helmet`, a package that allows management of the document head. Gatbsy's react helmet plugin provides support for server rendering data. Anything added to the Helmet component will be automatically generated as static HTML.

This is important because having pages only in JavaScript is generally not good for SEO. Crawlers like Googlebot have no problem with server-side rendered content, but when a site or app is client-side rendered, Googlebot will get a blank HTML page on intitial load. *Then* the JavaScript content is asynchronously downloaded. So Helmet is necessary to ensure all pages get rendered with a corresponding HTML page with the correct tags.

So we'll add data like the tite, language, description, and then add a block for 'OpenGraph', which is for facebook, and a block for twitter cards, and just pass in all the same data.

```jsx
// src/components/SEO.jsx
...
              '@id': siteUrl,
            },
          },
        ];
      }
      return (
        <>
          <Helmet title={seo.title}>
            <html lang={siteLanguage} />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="apple-mobile-web-app-title" content={shortName} />
            <meta name="application-name" content={shortName} />
            <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

            {/* OpenGraph  */}
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={article ? 'article' : null} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            </Helmet>
        </>
      );
    }}
  />
);
...
```

Now we can import and add the SEO component to our layout. We can also add it to pages like our `post.jsx`, and pass in props to give the actual page value instead of the site defaults.

```jsx
//src/templates/post.jsx
...
  return (
    <Layout>
      <SEO
        title={title}
        description={post.frontmatter.description || post.excerpt || ' '}
        image={image}
        pathname={post.frontmatter.path}
        article
      />
...
```

And we can use `<Helmet>` in files like our `blog.jsx` page:

```jsx
...
  return (
    <Layout>
      <Helmet title={'Blog'} />
...
```

## Cleaning Up

This isn't specific to Gatsby, but it's always a good idea to make sure all your code is clean. We'll be using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io). Let's `npm i babel-eslint eslint prettier eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react --save-dev`.

- **eslint-config-prettier** turns off rules that may conflict with prettier.
- **eslint-plugin-import** supports ES6+ import/export syntax.
- **eslint-plugin-prettier** runs prettier as an ESLint rule.
- **eslint-plugin-jsx-a11y** for accessibility rule checking.
- **eslint-plugin-react** React specific rules.

In `package.json` add two scripts to run linting and formatting.

```jsx
// package.json
...
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "lint": "eslint src/**/*.{js,jsx}",
    "format": "prettier --write src/**/*.{js,jsx}"
  },
...
```

Then create `.eslintrc` in the root of the project and add to it:

```jsx
// .eslintrc
{
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "strict": 0,
    "no-console": "warn",
    "quotes": [
      "warn",
      "single"
    ],
    "no-unused-vars": [
      1
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "prettier/prettier": "warn"
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["prettier", "jsx-a11y"]
}
```

In `.pretierrc` add a few rules. There are many rules that have a default, so they don't need to be specified.

Some defaults are:

`"printWidth": 80`
`"semi": true`
`"bracketSpacing": true`
`"jsxBracketSameLine": false`

We want those rules, so we just won't add them to the file.

```jsx
{
  "singleQuote": true,
  "trailingComma": "es5",
}
```

Format your project with `npm run format` and a list of files that were edited will be printed. ESLint will also be running, and unless you're a freak of nature, there will probably be errors in some files. Also notice Prettier added semicolons and commas, and maybe broke apart some lines that were over 80 characters long. Now is a good time to go through all of the files and fix whatever errors ESLint is mentioning.

## Deploying

Now that we have a fully functional website, we can deploy it for the whole world to see. Since we just built a static site, we have many options. [Netlify](https://www.netlify.com/), [Surge](https://surge.sh/), [Heroku](https://www.heroku.com/) and [Github Pages](https://pages.github.com/) are just a few examples of some places to host the site that are either free or have a free tier.

## Conclusion

Gatsby is an amazing tool that makes it easy to build incredibly fast websites. Seriously, build and serve the project and run a Google Lighthouse audit. You should get 100 in every category.

But this is just an overview of Gatsby by building the most basic blog site; much more can be done.

The code for this guide can be found in the [repository's master branch.](https://github.com/justinformentin/gatsby-v2-tutorial-starter)

If you have any questions, please send me a message on [Twitter.](https://twitter.com/justinformentin)