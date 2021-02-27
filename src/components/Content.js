import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import prism from '../styles/prism';
// import { MDXRenderer } from 'gatsby-plugin-mdx';

const Wrapper = styled.div`
  color: var(--color-text);
  p,
  li {
    letter-spacing: 0.2px;
    font-family: sans-serif;
    font-size: 18px;
    line-height: 1.8;
    code {
      padding: 0.2rem 0.5rem;
      margin: 0.5rem 0;
    }
  }
  p > code,
  li > code {
    // color: var(--color-inlinecode);
    // background: rgb(83 166 222 / 40%);
    color: var(--color-inlinecode);
    word-spacing: normal;
    word-break: normal;
    border-radius: 5px;
    padding: 0;
  }
  p > code:before {
    content: '\`';
  }
  p > code:after {
    content: '\`';
  }
  a:not(.gatsby-resp-image-link):not(.anchor) {
    color: var(--color-md-link);
    border-bottom: 2px solid var(--color-md-und);
    transition: ${(props) => props.theme.trans.all};
    text-decoration: none;
    &:hover,
    &:focus {
      border-bottom: 2px solid #535684;
    }
  }
  h2 {
    margin: 0.5rem 0;
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.3rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: inline-block;
    position: relative;
    a {
      box-shadow: none;
      border-bottom: none;
      &:hover,
      &:focus {
        background: none;
      }
    }
    &:hover {
      .anchor svg {
        opacity: 0.8;
      }
    }
  }
  .anchor {
    margin-left: -30px !important;
    padding: 4px !important;
    position: absolute;
    float: none;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 900px) {
      margin-left: -24px !important;
    }
    svg {
      fill: ${(props) => props.theme.colors.black.base};
      visibility: hidden;
      display: block;
      opacity: 0;
      transition: ${(props) => props.theme.trans.all};
      width: 20px;
      height: 20px;
      @media (max-width: 900px) {
        opacity: 0.2;
        visibility: visible !important;
        height: 16px;
        width: 16px;
      }
    }
  }
  blockquote {
    margin: 0px;
    padding: 1rem 2rem;
    border-left: 5px solid #619fd4;
    border-radius: 5px;
    background: var(--color-bqbg);
  }
  // blockquote > :first-child{
  //   padding: 1rem 0;
  // }
  blockquote > p,
  blockquote > h5,
  blockquote > h6 {
    padding: 0;
    margin: 0;
  }
  .one-monokai .mtk1 {
    color: #d5d5d5;
  }
  .grvsc-gutter {
    color: #d5d5d5;
  }
  .grvsc-source{
    color: var(--color-background);
  }
`;

// ${prism}

const Content = ({ input }) => (
  <Wrapper dangerouslySetInnerHTML={{ __html: input }} />

  // <Wrapper>
  // <MDXRenderer>{input}</MDXRenderer>
  // </Wrapper>
);

export default Content;

Content.propTypes = {
  input: PropTypes.any.isRequired,
};
