import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import config from '../../config/website';
import { MaxWidth, Heading } from '../styles/shared';
import { Layout } from '../components';
import { SnippetBlock } from '../components/SnippetBlock';
import { useSnippetsQuery } from '../hooks/useSnippetsQuery';

const SnippetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // flex-wrap: wrap;
`;

export default () => {
  const snippets = useSnippetsQuery();
  return (
    <Layout>
      <Helmet title={`Portfolio | ${config.siteTitle}`} />
      <Heading>Portfolio</Heading>
      <MaxWidth>
        <SnippetContainer>
          {snippets.map((s) => (
            <SnippetBlock
              key={s.node.frontmatter.title}
              path={s.node.fields.slug}
              title={s.node.frontmatter.title}
            />
          ))}
        </SnippetContainer>
      </MaxWidth>
    </Layout>
  );
};

// import React from 'react';
// import { BlogPageBase } from '../components/BlogPageBase';

// export default () => <BlogPageBase pageTitle='Snippets' />;
