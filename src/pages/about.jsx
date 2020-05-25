/* eslint max-len: 0 */

import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import styled from "react-emotion";
import { Container, Layout } from "elements";
import { Header } from "components";
import config from "../../config/website";

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1rem 5rem;
`;

const About = () => (
  <Layout>
    <Helmet title={`About | ${config.siteTitle}`} />
    <Header title="About" />
    <Wrapper>
      <Container>
        <p>
          Early on in my days of learning, I realized that documentation was an
          integral part of any project. I'm also a firm believer that the best
          way to learn anything is to teach it.
        </p>
        <p>
          So I'm putting some of my projects into blog and tutorial format. My
          goal is to both help myself, as well as anyone else out there
          learning, and write articles that are easy to follow and can be
          updated.
        </p>
      </Container>
    </Wrapper>
  </Layout>
);

export default About;
