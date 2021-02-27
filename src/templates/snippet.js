import React from 'react';
import { graphql } from 'gatsby';
// import styled from 'styled-components';
import { Line, H1 } from '../styles/shared';
import {
  PostHeadingWrapper,
  PostContainer,
  PostWrap,
  PostMaxWidth,
} from '../styles/sharedPost';
import {
  Suggestions,
  // SEO,
  Content,
  Layout,
} from '../components';

export default ({ pageContext: { slug, left, right }, data }) => {
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) post.id = slug;

  return (
    <Layout>
      {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
      <PostHeadingWrapper>
        <H1>{post.title}</H1>
      </PostHeadingWrapper>
      <PostMaxWidth>
        <PostContainer>
          <PostWrap>
            <Content input={postNode.html} />
            <Line aria-hidden="true" />
            <Suggestions left={left} right={right} />
          </PostWrap>
        </PostContainer>
      </PostMaxWidth>
    </Layout>
  );
};

export const pageQuery = graphql`
  query SnippetBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        lang
        chunk
        published
      }
      fields {
        slug
        sourceInstanceName
      }
    }
  }
`;
