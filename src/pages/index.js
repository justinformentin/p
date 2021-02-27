import React from 'react';
import styled from 'styled-components';
import { HomeSidebar, Layout } from '../components';
import { Row, Column, Heading, maxWidthBase } from '../styles/shared';
import { PostList } from '../components/BlogPageBase';
import { useAllViews } from '../hooks/usePageViews';

const MaxWidthRow = styled(Row)`
  ${maxWidthBase};
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const FirstColumn = styled(Column)`
  margin-right: 7rem;
  width: 70%;
  @media (max-width: 750px) {
    margin-right: 0;
    width: 100%;
  }
`;

export default () => {
  return(
  <Layout>
    <MaxWidthRow>
      <FirstColumn>
        <Heading align={'left'}>Recent Posts</Heading>
        <PostList pageKind={'Home'} allPosts={true} postLimit={6} />
      </FirstColumn>
      <HomeSidebar />
    </MaxWidthRow>
  </Layout>
)};
