import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '../components'
import { MaxWidth, Heading } from '../styles/shared';
import config from '../../config/website';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem 5rem;
`;

export default () => (
  <Layout>
    <Helmet title={`404 | ${config.siteTitle}`} />
    <Heading>404</Heading>
    <Wrapper>
      <MaxWidth>
        <h1> Woops, something went wrong here.</h1>
        <h3>
          The page you wanted to visit no longer exists or is currently
          unreachable.
        </h3>
        <p>
          I swear this never happens. You're just so pretty, and I'm a little
          nervous. Please don't tell my friends.
          <br /> <br />
          <h3>
            Return to the <Link to="/">Homepage</Link>. Or contact me on{' '}
            <a
              href="https://twitter.com/justinformentin"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Twitter.
            </a>{' '}
          </h3>
        </p>
      </MaxWidth>
    </Wrapper>
  </Layout>
);
