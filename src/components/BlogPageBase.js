import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { H3 } from '../styles/shared';
import { PostDetails } from './PostDetails';
import { Layout } from '../components';
import { Column, Heading, MaxWidth } from '../styles/shared';
import config from '../../config/website';
import { useAllPostsQuery } from '../hooks/useAllPostsQuery';

const PostItemWrapper = styled.div`
  margin-bottom: 3rem;
  &:hover {
    h3 {
      color: var(--color-blue);
    }
  }
`;

const mt = { margin: '0.5rem 0 0 0' };
export const PostItem = ({ title, date, category, path, chunk, ttr }) => (
  <PostItemWrapper>
    <Link style={{ display: 'inline-block' }} to={path}>
      <H3 style={{ lineHeight: 1 }}>{title}</H3>
      <PostDetails date={date} category={category} ttr={ttr} />
      <div style={mt}>{chunk}</div>
    </Link>
  </PostItemWrapper>
);

export const PostList = ({ pageKind, allPosts, postLimit }) => {
  const postQuery = useAllPostsQuery();

  const posts = allPosts
    ? [...postQuery.code.edges, ...postQuery.general.edges].sort((a, b) => {
        const ad = a.node.frontmatter.date;
        const bd = b.node.frontmatter.date;
        return ad < bd ? 1 : ad > bd ? -1 : 0;
      })
    : postQuery[pageKind].edges;


  // const filtered = posts.filter(({node}) => node.frontmatter.published === 'true')
  const filtered = posts.filter(({ node }) => {
    return node.frontmatter.published === 'true';
  });
  const slicedPosts = filtered.slice(0, postLimit || posts.length);

  return slicedPosts.map(({ node: { frontmatter, fields, timeToRead } }) => (
    <PostItem
      key={frontmatter.title}
      title={frontmatter.title}
      chunk={frontmatter.chunk}
      date={frontmatter.date}
      category={frontmatter.category}
      path={fields.slug}
      ttr={timeToRead}
    />
  ));
};

export const BlogPageBase = ({ pageTitle, allPosts }) => {
  const pageKind = pageTitle.toLowerCase();

  return (
    <Layout>
      <MaxWidth>
        <Helmet title={`${pageTitle} | ${config.siteTitle}`} />
        <Heading>{pageTitle}</Heading>
        <Column>
          <PostList pageKind={pageKind} allPosts={allPosts} />
        </Column>
      </MaxWidth>
    </Layout>
  );
};
