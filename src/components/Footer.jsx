import React from 'react';
import styled from 'react-emotion';
import { Container } from 'elements';
import { FooterBG, Button } from 'components';

const Wrapper = styled.footer`
  position: relative;
  padding-top: 3rem;
  font-family: ${props => props.theme.fontFamily.heading};
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 0;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-top: 0;
  }
`;

const Content = styled.div`
  margin: 1rem 0;
`;

const Copyright = styled.div`
  margin: 0 0 1rem 0;
  text-align: center;
  color: ${props => props.theme.colors.white.blue};
`;

const Contact = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Text = styled.div`
  color: ${props => props.theme.colors.white.base};
  padding-top: 2.5rem;
  margin-right: 2rem;
`;

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Wrapper>
      <FooterBG />
      <Container>
        <Contact>
          <Text>
            <h1>Get in touch!</h1>
          </Text>
          <a href="mailto:talktojustintoday@gmail.com">
            <Button large type="secondary">
              Email Me
            </Button>
          </a>
        </Contact>
        <Content>
          <Copyright>
            Copyright © {year} Justin Formentin &mdash; Built with <a href="https://gatsbyjs.org">Gatsby</a>
          </Copyright>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Footer;
