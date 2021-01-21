import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Centered, Container, InfoText, Line } from '../styles/shared';
import {
  Tags,
  Suggestions,
  Title,
  SEO,
  Content,
  Layout,
  PostItem,
} from '../components';
import styled from 'styled-components';
import { useMediaQuery } from '../hooks/useMediaQuery';

const TocWrap = styled.aside`
  position: fixed;
  right: 5rem;
  // margin-top: 2rem;
  // padding-top: 2rem;
  transition: all ease 0.3s;
`;
const TocItem = styled.div`
  padding-left: ${({ level }) =>
    level === 3 ? '1rem' : level === 4 ? '2rem' : '0'};
`;
const TocLink = styled.a`
  color: var(--color-text);
  font-size: 15px;
  text-decoration: none;
`;
const TocHeader = styled.div`
  font-size: 16px;
  color: var(--color-text);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
const PostContainer = styled.div`
  // display: flex;
  color: var(--color-text);
  padding: 2rem 0;
  // margin: 0 auto;
  // margin-right: 30rem;
  // max-width: 800px;
  // width: 60%;
  // @media (max-width: 1600px) {
  //   width: 75%;
  // }
  // @media (max-width: 1200px) {
  //   width: 80%;
  // }
  @media (max-width: 1000px) {
    max-width: 100%;
    margin-right: 0;
  }
`;

const Post = ({
  pageContext: { slug, left, right },
  data: { markdownRemark: postNode },
}) => {
  const [toc, setToc] = useState([]);

  const medium = useMediaQuery('1000px');

  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  useEffect(() => {
    const getHeadings = () => {
      let activeEl;

      const contentContainer = document.querySelector('#content-container');

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          let newActiveEl;
          if (entry.isIntersecting) {
            const tocWrap = document.querySelector('#toc-wrap');
            if (tocWrap)
              newActiveEl = tocWrap.querySelector(
                `[href="#${entry.target.getAttribute('id')}"]`
              );
            if (activeEl) activeEl.style.color = 'var(--color-text)';
            if (newActiveEl) newActiveEl.style.color = 'var(--color-primary)';
            activeEl = newActiveEl;
          }
        });
      };

      if (contentContainer) {
        const headings = contentContainer.querySelectorAll(
          'h1, h2, h3, h4, h5, h6'
        );
        const tocArr = [];
        Array.from(headings).forEach((el) => {
          const hid = el.getAttribute('id');
          const level = Number(el.localName.split('').splice(1, 1).join());

          if (hid) {
            tocArr.push({ hid, level });
            const observer = new IntersectionObserver(observerCallback, {
              threshold: 1,
              root: document,
            });
            observer.observe(el);
          }
        });
        if (tocArr.length > 0) contentContainer.style.maxWidth = '800px';
        setToc(tocArr);
      } else setTimeout(getHeadings, 1000);
    };
    const watchTitle = () => {
      const headerContainer = document.querySelector('#header-container');
      console.log('headerContainer', headerContainer);
      const observerCallback = (entries) =>
        entries.forEach((entry) => {
          const tocWrap = document.querySelector('#toc-wrap');
          if (tocWrap)
            tocWrap.style.top = entry.isIntersecting ? '13rem' : '3rem';
        });

      if (headerContainer) {
        const observer = new IntersectionObserver(observerCallback, {
          threshold: 1,
          root: document,
        });
        observer.observe(headerContainer);
      } else setTimeout(watchTitle, 1000);
    };
    getHeadings();
    watchTitle();
  }, []);

  const TOC = () => {
    const convertToSentence = (hid) =>
      hid
        .split('-')
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    return (
      <TocWrap id="toc-wrap">
        <TocHeader>Table of Contents</TocHeader>
        {toc.map((item) => (
          <TocItem level={item.level} key={item.hid}>
            <TocLink href={'#' + item.hid}>
              {convertToSentence(item.hid)}
            </TocLink>
          </TocItem>
        ))}
      </TocWrap>
    );
  };

  const WaveContainer = styled.div`
    overflow: hidden;
    display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 90px;
    transform: translateY(1px);
    z-index: 3;
  `;
  const WaveSVG = styled.svg`
    position: absolute;
    left: -3%;
    right: -3%;
    bottom: 0px;
    width: 106%;
    min-width: 600px;
    fill: var(--color-background);
    transition: fill 350ms ease 0s;
  `;
  const Wave = () => (
    <WaveContainer>
      <WaveSVG
        preserveAspectRatio="none"
        width="1440"
        height="74"
        viewBox="0 0 1440 74"
      >
        <path d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"></path>
      </WaveSVG>
    </WaveContainer>
  );

  return (
    <Layout>
      {/* <SEO postPath={slug} postNode={postNode} postSEO /> */}

      <Title>
        <Centered>
          <PostItem post={post} timeToRead={postNode.timeToRead} />
        </Centered>
      </Title>
      <Wave />
      {/* <PostContainer> */}

      {!medium && toc && toc.length > 0 ? <TOC /> : null}

      <PostContainer id="content-container">
        <Content input={postNode.html} />
        <Line aria-hidden="true" />
        <Tags tags={post.tags} />
        <InfoText>More Posts</InfoText>
        <Suggestions left={left} right={right} />
      </PostContainer>

      {/* </PostContainer> */}
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        kind
        title
        # date @dateformat(formatString: "MMMM DD, YYYY")
        date
        category
        tags
      }
      fields {
        slug
        sourceInstanceName
      }
    }
  }
`;
